import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppErrors';
import User from '../user/user.model';
import { TForgotPassword, TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import createJwtToken from './auth.utils';
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

const resetPasswordIntoDB = async (
  user: JwtPayload,
  payload: TForgotPassword,
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
  const decoded = jwt.verify(
    refreshToken,
    config.refresh_token as string,
  ) as JwtPayload;

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
 
  sendEmail(user?.email , resetPasswordUrl)
};

export const AuthService = {
  loginUserFromDB,
  forgotPasswordIntoDB,
  resetPasswordIntoDB,
  refreshTokenFromCookie,
};
