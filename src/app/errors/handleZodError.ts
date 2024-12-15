import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";
import { StatusCodes } from "http-status-codes";

const handleZodError = (err: ZodError) : TGenericErrorResponse => {
    const statusCode = StatusCodes.BAD_REQUEST;
    const errorSources : TErrorSources[] = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    return {
      statusCode,
      message: 'zod validation error',
      errorSources,
    };
  };
export default handleZodError