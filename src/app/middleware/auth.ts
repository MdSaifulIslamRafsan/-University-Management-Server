import { StatusCodes } from "http-status-codes";
import AppError from "../errors/AppErrors";
import catchAsync from "../utils/catchAsync";
import { NextFunction , Request , Response } from 'express';

const auth = () => {
    return catchAsync(async(req : Request , res : Response, next : NextFunction)=> {
        const token = req.headers.authorization;
        if(!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED , "Invalid authorization")
        }
        next();
    }) 
}

export default auth;