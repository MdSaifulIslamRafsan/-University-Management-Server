import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppErrors';
import User from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from "jsonwebtoken"
import config from '../../config';

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
    role: user.role
  }

  const accessToken = jwt.sign(jwtPayload, config.access_token as string, { expiresIn : '10d' });

  return {
    needsPasswordChange: user.needsPasswordChange,
    accessToken
  };
};

export const AuthService = {
  loginUserFromDB,
};
