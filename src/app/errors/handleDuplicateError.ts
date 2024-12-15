import { StatusCodes } from 'http-status-codes';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractMessage = match && match[1];

  const errorSources: TErrorSources[] = [
    {
      path: err.keyValue,
      message: `${extractMessage} is already exists`,
    },
  ];
  return {
    statusCode: StatusCodes.CONFLICT,
    message: 'Conflict: Duplicate entry',
    errorSources,
  }
};

export default handleDuplicateError;