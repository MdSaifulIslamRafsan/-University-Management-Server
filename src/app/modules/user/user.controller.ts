
// import userSchemaValidation from './user.validation';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { JwtPayload } from 'jsonwebtoken';



const createStudent  = catchAsync(async (req, res) => {

    const { password , student: studentData} = req.body;


    const result = await userService.createStudentIntoDB(password , studentData);

    sendResponse(res , {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Student is created successfully',
      data: result,

  })
})

const getMe = catchAsync(async(req , res) => {



  const {id , role} = req.user as JwtPayload;

  const result = await userService.getMeFromDB(id, role)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User data retrieved successfully',
    data: result,
  })


})

const changeStatus = catchAsync(async(req , res) => {
  const {id} = req.params
  const result = await userService.changeStatusFromDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Status changed successfully',
    data: result,
  })

})

export const userController = {
    createStudent,
    getMe,
    changeStatus,
 
}