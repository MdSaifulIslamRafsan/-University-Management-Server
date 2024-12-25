import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import { JwtPayload } from 'jsonwebtoken';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUserFromDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User login successful',
    data: result,
  });
});

const forgetPassword = catchAsync(async(req ,res)=>{

  const result = await AuthService.forgotPasswordIntoDB(req.user as JwtPayload , req.body)
  sendResponse(res , {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Password Updated successfully',
    data : result,
  })
})

export const AuthController = {
  loginUser,
  forgetPassword
};
