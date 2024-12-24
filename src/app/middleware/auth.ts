import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppErrors';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRoles } from '../modules/user/user.interface';

const auth = (...RequiredRoles : TUserRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid authorization');
    }
    jwt.verify(token, config.access_token as string, function (err, decoded) {
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
    });
  });
};

export default auth;
