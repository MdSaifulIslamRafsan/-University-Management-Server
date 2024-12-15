import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";
import { StatusCodes } from "http-status-codes";

const handleValidationError = (err : mongoose.Error.ValidationError ) : TGenericErrorResponse =>{

    const statusCode = StatusCodes.BAD_REQUEST;
    const errorSources : TErrorSources[] = Object.values(err.errors).map((value : mongoose.Error.ValidatorError | mongoose.Error.CastError ) => {
        return {
            path: value.path,
            message : value.message
        }
    });

    return {
        statusCode,
        message: "Validation failed",
        errorSources
    }
}

export default handleValidationError;