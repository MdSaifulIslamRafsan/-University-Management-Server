import { NextFunction, Request, Response } from "express";

 // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
 const globalErrorHandler = (err : any, req : Request, res : Response, next : NextFunction) => {
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || 'Something went wrong!';

    res.status(errorStatus).send({
        success : false,
        message: errorMessage,
        error: err,
    })

}

export default globalErrorHandler;