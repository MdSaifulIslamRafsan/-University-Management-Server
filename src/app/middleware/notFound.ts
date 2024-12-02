import { NextFunction, Request, Response } from "express";
import { NotFound } from 'http-errors';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NotFoundPage = (req : Request , res : Response , next : NextFunction) => {
    res.send(NotFound).send({
        success : false,
        message : "Page not found",
        error : ''
    })
}

export default NotFoundPage;