import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";
import { StatusCodes } from "http-status-codes";

const handleCastError = (err : mongoose.Error.CastError) : TGenericErrorResponse => {
    const statusCode = StatusCodes.BAD_REQUEST;
    const errorSources : TErrorSources[] = [{
        path: err.path,
        message: err.message,
    }]

    return {
        statusCode,
        message: "Invalid _id",
        errorSources
    };
};


export default handleCastError;