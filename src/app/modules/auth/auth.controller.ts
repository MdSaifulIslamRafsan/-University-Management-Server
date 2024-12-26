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

const forgetPassword = catchAsync(async(req ,res)=>{

  const result = await AuthService.forgotPasswordIntoDB(req.user as JwtPayload , req.body)
  sendResponse(res , {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Password Updated successfully',
    data : result,
  })
})

const refreshToken = catchAsync(async (req , res) => {
  const refreshToken = req.cookies.refreshToken;
  const result = await AuthService.refreshTokenFromCookie(refreshToken)
  sendResponse(res , {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Token refreshed successfully',
    data: result,
  })
})

export const AuthController = {
  loginUser,
  forgetPassword,
  refreshToken
};
