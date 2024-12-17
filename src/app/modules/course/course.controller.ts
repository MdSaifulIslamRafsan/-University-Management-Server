import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseService } from "./course.service";

const createCourse = catchAsync(async(req , res)=>{
    const course = req.body;
    const result = await courseService.createCourseIntoDB(course)
    sendResponse(res ,{
        success: true,
        statusCode: StatusCodes.OK,
        message: "Course created successfully",
        data: result
    })
});

const getAllCourses = catchAsync( async(req , res)=>{
    const result = await courseService.getAllCoursesFromDB();
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "All courses retrieved successfully",
        data: result
    });
})

const getSingleCourse = catchAsync(async (req , res)=>{
    const {id} = req.params;
    const result = await courseService.getSingleCourseFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Course retrieved successfully",
        data: result
    })
})

const deleteCourse = catchAsync( async (req , res) => {
    const {id} = req.params;
    const result = await courseService.deleteCourseFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Course deleted successfully",
        data: result
    })
})


export const courseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse
}