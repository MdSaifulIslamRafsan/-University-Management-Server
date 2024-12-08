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

const getSingleAcademicFaculty = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await AcademicFacultyService.singleAcademicFacultyIntoDB(id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Academic Faculty retrieved successfully",
        data: result
    })
});

const updateAcademicFaculty = catchAsync(async(req , res) => {
    const {id} = req.params;
    const body = req.body;
    const result = await AcademicFacultyService.updateAcademicFacultyIntoDB(id , body)
    sendResponse(res , {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Academic Faculty updated successfully",
        data: result
    })
})
export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}