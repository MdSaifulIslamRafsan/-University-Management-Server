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
  const {id , role} = req.user as JwtPayload;

  const result = await AuthService.forgotPasswordIntoDB(id , role , req.body)
  sendResponse(res , {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Password reset link sent',
    data : null,
  })
})

export const AuthController = {
  loginUser,
  forgetPassword
};
