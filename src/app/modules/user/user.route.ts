import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../students/student.validation';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { UserRoles } from './user.constant';
const router = express.Router();


// Define routes
router.post('/create-student', auth(UserRoles.admin), validateRequest(studentValidations.createStudentValidationSchema), userController.createStudent);

router.get('/me', auth(UserRoles.admin , UserRoles.faculty, UserRoles.student), userController.getMe);

router.patch('/change-status/:id', userController.changeStatus)

export const UserRoutes = router;
