

import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middleware/auth';
import { UserRoles } from '../user/user.constant';
const router = express.Router();

router.post('/login', validateRequest(AuthValidation.loginUserValidation), AuthController.loginUser )
router.post('/reset-password', auth(UserRoles.admin , UserRoles.faculty, UserRoles.student), validateRequest(AuthValidation.resetPasswordValidation), AuthController.resetPassword )

router.post('/refresh-token', validateRequest(AuthValidation.refreshTokenValidation), AuthController.refreshToken )

router.post('/forgot-password', AuthController.forgetPassword)

export const AuthRoutes =  router;