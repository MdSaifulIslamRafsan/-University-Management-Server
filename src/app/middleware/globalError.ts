import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../intarface/error';
import config from '../config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorStatus = err.statusCode || 500;
  let errorMessage = err.message || 'Something went wrong!';



  let errorSource: TErrorSource[] = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  const handleZodError = (err: ZodError) => {
    const StatusCode = 400;
    const errorSource : TErrorSource[] = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    return {
      StatusCode,
      message: 'zod validation error',
      errorSource,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    errorStatus = simplifiedError.StatusCode;
    errorMessage = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  }

  res.status(errorStatus).send({
    success: false,
    message: errorMessage,
    errorSource,
    stack : config.NODE_ENV === 'development' ? err?.stack : null
  });
};

export default globalErrorHandler;
