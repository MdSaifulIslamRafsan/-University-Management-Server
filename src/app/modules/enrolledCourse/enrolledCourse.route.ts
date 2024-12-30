import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { EnrolledCourseValidation } from './enrolledCourse.validation';
import { EnrolledCourseController } from './enrolledCourse.controller';
import auth from '../../middleware/auth';
import { UserRoles } from '../user/user.constant';

const router = express.Router();

router.post('/' , auth(UserRoles.student) , validateRequest(EnrolledCourseValidation.createEnrolledCourseValidation) , EnrolledCourseController.createEnrolledCourse );

export const EnrolledCourseRoutes = router;