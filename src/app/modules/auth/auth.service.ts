import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppErrors';
import User from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
const loginUserFromDB = async (payload: TLoginUser) => {
  const { id, password } = payload;

  // const isUserExist = await User.findOne({id});

  if (!(await User.isUserExistByCustomId(id))) {
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

  /*  const isValidPassword = bcrypt.compareSync(password, isUserExist.password);

    if(!isValidPassword){
        throw new AppError(StatusCodes.FORBIDDEN, 'Invalid password')
    } */
  

  return {};
};

export const AuthService = {
  loginUserFromDB,
};
