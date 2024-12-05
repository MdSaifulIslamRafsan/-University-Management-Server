import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";


const createAcademicSemester = catchAsync(async (req , res) => {

    // const result = await 

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
         message: 'Academic Semester created successfully',
         data: result,

    })
    
})


export const academicSemesterController = {
    createAcademicSemester
}