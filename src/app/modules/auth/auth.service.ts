import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppErrors';
import User from '../user/user.model';
import { TForgotPassword, TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
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

  const accessToken = jwt.sign(jwtPayload, config.access_token as string, {
    expiresIn: '10d',
  });

  return {
    needsPasswordChange: user.needsPasswordChange,
    accessToken,
  };
};

const forgotPasswordIntoDB = async (
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
    { password: newPasswordHash, needsPasswordChange: false , passwordChangeAt: new Date() },
    { new: true },
  );
  return null;
};

export const AuthService = {
  loginUserFromDB,
  forgotPasswordIntoDB,
};
