

import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
const router = express.Router();

router.post('/login', validateRequest(AuthValidation.loginUserValidation), )

export const AuthRoutes =  router;