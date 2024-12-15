import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError.';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppErrors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorStatus =  500;
  let errorMessage = 'Something went wrong!';



  let errorSource: TErrorSources[] = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];


  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    errorStatus = simplifiedError.statusCode;
    errorMessage = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  }else if (err?.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        errorStatus = simplifiedError.statusCode;
        errorMessage = simplifiedError.message;
        errorSource = simplifiedError.errorSources;
  }else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    errorStatus = simplifiedError.statusCode;
    errorMessage = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  }else if (err?.code === 11000){
    const simplifiedError = handleDuplicateError(err);
    errorStatus = simplifiedError.statusCode;
    errorMessage = simplifiedError.message;
    errorSource = simplifiedError.errorSources;

  }else if(err instanceof AppError){
    errorStatus = err.statusCode;
    errorMessage = err.message;
    errorSource = [{
      path: '',
      message: err?.message,
    }]
  }
 

  res.status(errorStatus).send({
    success: false,
    message: errorMessage,
    err,
    errorSource,
    stack : config.NODE_ENV === 'development' ? err?.stack : null
  });
};

export default globalErrorHandler;
