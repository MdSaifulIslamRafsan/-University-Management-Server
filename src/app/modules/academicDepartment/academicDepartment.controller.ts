import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentService } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async(req , res) => {
    const body = req.body;

    const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(body)

    sendResponse(res , {
        statusCode: StatusCodes.OK,
        success : true,
        message: "Academic Department created successfully",
        data: result
    })
    
})



export const AcademicDepartmentController = {
    createAcademicDepartment
}