import { Response } from "express";

interface TResponseData<T> {
    statusCode : number,
    success : boolean,
    message?: string,
    data : T
}

const sendResponse = <T> (res : Response , data : TResponseData<T>) =>{
    res.status(data?.statusCode).send({
        success : data.success,
        message : data.message,
        data : data.data
    })
}

export default sendResponse;