import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EnrolledCourseService } from "./enrolledCourse.service";
import { JwtPayload } from "jsonwebtoken";

const createEnrolledCourse = catchAsync(async(req , res) =>{

    const {id} = req.user as JwtPayload;

    const result = await EnrolledCourseService.createdEnrolledCourseIntoDB(id, req.body)

    sendResponse(res , {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "Enrolled course created successfully",
        data: result
    })
})

export const EnrolledCourseController = {
    createEnrolledCourse
}