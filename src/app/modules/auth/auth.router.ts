

import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
const router = express.Router();

router.post('/login', validateRequest(AuthValidation.loginUserValidation), AuthController.loginUser )
router.post('/forgot-password', validateRequest(AuthValidation.forgotPasswordValidation), AuthController.loginUser )

export const AuthRoutes =  router;