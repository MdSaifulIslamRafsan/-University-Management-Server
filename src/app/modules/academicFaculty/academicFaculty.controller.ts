import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyService } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async(req , res) => {
    const body = req.body;
    const result = await AcademicFacultyService.createAcademicFacultyIntoDB(body);

    sendResponse(res , {
        success : true,
        statusCode : StatusCodes.OK,
        message : "Academic Faculty created successfully",
        data : result
    })

})

const getAllAcademicFaculty = catchAsync(async(req , res) => {
    const result = await AcademicFacultyService.getAllAcademicFacultyIntoDB();
    sendResponse(res , {
        success : true,
        statusCode: StatusCodes.OK,
        message : "All Academic Faculties retrieved successfully",
        data : result
    })


})

export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty
}