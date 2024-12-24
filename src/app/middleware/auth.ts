import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppErrors';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid authorization');
    }
    jwt.verify(token, config.access_token as string, function (err, decoded) {
      if (err) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
      }

      req.user = decoded as JwtPayload;
    //   req.user = decoded;
      next();
    });
  });
};

export default auth;
