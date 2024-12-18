import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistration.service";


const createSemesterRegistration = catchAsync( async(req , res)=>{

    const body = req.body ;
    const result = await SemesterRegistrationService.createSemesterRegistrationIntoDB(body);


    sendResponse(res , {
        success : true ,
        statusCode : StatusCodes.CREATED,
        message : 'Registration successful' ,
        data : result  
       
    })


})

export const SemesterRegistrationController = {
    createSemesterRegistration
}