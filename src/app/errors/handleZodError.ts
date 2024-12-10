import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";

const handleZodError = (err: ZodError) => {
    const StatusCode = 400;
    const errorSource : TErrorSources[] = err.issues.map((issue: ZodIssue) => {
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
export default handleZodError