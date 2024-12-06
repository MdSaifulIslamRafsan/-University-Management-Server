import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterService } from "./academicSemester.service";


const createAcademicSemester = catchAsync(async (req , res) => {

    const result = await AcademicSemesterService.createAcademicSemesterIntoDB(req.body)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
         message: 'Academic Semester created successfully',
         data: result,

    })

    
})
const getAllAcademicSemester = catchAsync(async(req , res)=>{
    const result = await AcademicSemesterService.getAllAcademicSemesterIntoDB();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
         message: 'Academic Semester created successfully',
         data: result,

    })
})


export const academicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemester
}