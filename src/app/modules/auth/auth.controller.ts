import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppErrors';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUserFromDB(req.body);

  if(!result) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials')
  }
  const { needsPasswordChange, accessToken, refreshToken } = result;

  res.cookie('refreshToken', refreshToken , {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User login successful',
    data: {
      needsPasswordChange,
      accessToken
    },
  });
});

const changePassword = catchAsync(async(req ,res)=>{

  const result = await AuthService.changePasswordIntoDB(req.user as JwtPayload , req.body)
  sendResponse(res , {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Password Updated successfully',
    data : result,
  })
})

const refreshToken = catchAsync(async (req , res) => {
  const {refreshToken} = req.cookies;
  const result = await AuthService.refreshTokenFromCookie(refreshToken)
  sendResponse(res , {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Token refreshed successfully',
    data: result,
  })
})

const forgetPassword = catchAsync(async (req , res) => {
    const {id} = req.body;
    const result = await AuthService.forgotPasswordIntoDB(id);
    sendResponse(res , {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Reset Password Link Sent successfully',
      data: result,
    });
})

const resetPassword = catchAsync(async (req , res) => {
  const token = req.headers.authorization;

  if(!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Token is required')
  }


  const result = await AuthService.resetPasswordFromDB(token, req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Password Reset successfully',
    data: result,
  });
})

export const AuthController = {
  loginUser,
  forgetPassword,
  changePassword,
  refreshToken,
  resetPassword
};
