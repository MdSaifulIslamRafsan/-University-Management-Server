
// import userSchemaValidation from './user.validation';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';



const createStudent  = catchAsync(async (req, res) => {

    const { password , student: studentData} = req.body;
    // const zodParsedData = userSchemaValidation.parse(studentData);

    const result = await userService.createStudentIntoDB(password , studentData);

    sendResponse(res , {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Student is created successfully',
      data: result,

  })
})

export const userController = {
    createStudent,
}