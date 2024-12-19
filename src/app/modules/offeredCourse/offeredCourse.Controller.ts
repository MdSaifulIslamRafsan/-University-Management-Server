import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseService } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {

    const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body)

    sendResponse(res, {
        success : true,
        statusCode: StatusCodes.CREATED,
        message: "Offered course created successfully",
        data: result
    })
});

export const OfferedCourseController = {
    createOfferedCourse
}
