import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppErrors';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRoles } from '../modules/user/user.interface';
import User from '../modules/user/user.model';

const auth = (...RequiredRoles: TUserRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid authorization');
    }

    // 1st way
    /*  jwt.verify(token, config.access_token as string, function (err, decoded) {
      if (err) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
      }
      const role = (decoded as JwtPayload)?.role;
      if(RequiredRoles && !RequiredRoles.includes(role)){
        throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized to access this resource');
      }

      req.user = decoded as JwtPayload;
    //   req.user = decoded;
      next();
    }); */

    // 2nd way
    const decoded = jwt.verify(
      token,
      config.access_token as string,
    ) as JwtPayload;

    const { role, id, iat } = decoded;
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

    if (RequiredRoles && !RequiredRoles.includes(role)) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'You are not authorized to access this resource',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
