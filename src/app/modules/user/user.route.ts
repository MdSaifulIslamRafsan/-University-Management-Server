import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../students/student.validation';
import validateRequest from '../../middleware/validateRequest';
const router = express.Router();


// Define routes
router.post('/create-student', validateRequest(studentValidations.createStudentValidationSchema), userController.createStudent);

export const UserRoutes = router;
