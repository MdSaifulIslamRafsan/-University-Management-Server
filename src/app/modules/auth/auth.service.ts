import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppErrors';
import User from '../user/user.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import  { JwtPayload } from 'jsonwebtoken';
// import jwt from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createJwtToken, verifyToken } from './auth.utils';
import sendEmail from '../../utils/sendEmail';
const loginUserFromDB = async (payload: TLoginUser) => {
  const { id, password } = payload;

  // const isUserExist = await User.findOne({id});
  const user = await User.isUserExistByCustomId(id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  /*  const isDeleted = isUserExist?.isDeleted
    if(isDeleted) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User not found')
    }

    const userStatus = isUserExist?.status;
    if(userStatus === 'blocked') {
        throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked')
    } */

  //  const isValidPassword = bcrypt.compareSync(password, isUserExist.password);
  if (await User.isDeleted(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (await User.isUserBlocked(id)) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
  }

  if (!(await User.isValidPassword(password, user?.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid password');
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = createJwtToken(
    jwtPayload,
    config.access_token as string,
    config.access_expires_in as string,
  );

  const refreshToken = createJwtToken(
    jwtPayload,
    config.refresh_token as string,
    config.refresh_expires_in as string,
  );

  return {
    needsPasswordChange: user.needsPasswordChange,
    accessToken,
    refreshToken,
  };
};


const changePasswordIntoDB = async (
  user: JwtPayload,
  payload: TChangePassword,
) => {
  const { id, role } = user;
  const isUserExist = await User.isUserExistByCustomId(id);

  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (await User.isDeleted(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (await User.isUserBlocked(id)) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
  }
  if (
    !(await User.isValidPassword(payload?.oldPassword, isUserExist?.password))
  ) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid password');
  }

  const newPasswordHash = await bcrypt.hash(payload.newPassword, 10);

  await User.findOneAndUpdate(
    { id, role },
    {
      password: newPasswordHash,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
    { new: true },
  );
  return null;
};
const refreshTokenFromCookie = async (refreshToken: string) => {
  const decoded = verifyToken(refreshToken, config.refresh_token as string);

  const { id, iat } = decoded;
  const user = await User.isUserExistByCustomId(id);
  if (!user) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User not found');
  }
  if (await User.isDeleted(id)) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User not found');
  }
  if (await User.isUserBlocked(id)) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
  }

  if (
    user?.passwordChangeAt &&
    (await User.isJWTTokenIssuedBeforePassword(
      iat as number,
      user?.passwordChangeAt,
    ))
  ) {
    throw new AppError(StatusCodes.FORBIDDEN, 'user token not valid');
  }
  const jwtPayload = {
    id: user.id,
    role: user.role,
  };
  const accessToken = createJwtToken(
    jwtPayload,
    config.access_token as string,
    config.access_expires_in as string,
  );
  return {
    accessToken,
  };
};

const forgotPasswordIntoDB = async (id: string) => {
  const user = await User.isUserExistByCustomId(id);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (await User.isDeleted(id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (await User.isUserBlocked(id)) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const resetToken = createJwtToken(
    jwtPayload,
    config.access_token as string,
    '5m',
  );

  const resetPasswordUrl = `${config.reset_password_ui_link}?id=${user?.id}&token=${resetToken}`;

  sendEmail(user?.email, resetPasswordUrl);
};

const resetPasswordFromDB = async (
  token: string,
  payload: { id: string; newPassword: string },
) => {
  const user = await User.isUserExistByCustomId(payload?.id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (await User.isDeleted(payload?.id)) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (await User.isUserBlocked(payload?.id)) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
  }

  const decoded = verifyToken(token, config.access_token as string)
  if (decoded?.id !== payload?.id) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid user');
  }

/*   jwt.verify(token, config.access_token as string, function (err, decoded) {
    if (err) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Invalid token');
    }
    if ((decoded as JwtPayload)?.id !== payload?.id) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Invalid user');
    }
  }); */


  const newPasswordHash = await bcrypt.hash(payload.newPassword, 10);

  await User.findOneAndUpdate(
    {id: decoded?.id, role : decoded?.role },
    {
      password: newPasswordHash,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
    { new: true },
  );
  return null;
};

export const AuthService = {
  loginUserFromDB,
  forgotPasswordIntoDB,
  changePasswordIntoDB,
  refreshTokenFromCookie,
  resetPasswordFromDB,
};
