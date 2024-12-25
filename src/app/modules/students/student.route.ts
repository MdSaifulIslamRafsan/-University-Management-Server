import express from 'express';
import { StudentControllers } from './student.controller';
import { studentValidations } from './student.validation';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { UserRoles } from '../user/user.constant';


const router = express.Router();


router.get('/:studentId', StudentControllers.getSingleStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

router.patch('/:studentId', validateRequest(studentValidations.updateStudentValidationSchema) , StudentControllers.updateStudent)

router.get('/', auth(UserRoles.student) , StudentControllers.getAllStudents);

export const StudentRoutes = router;