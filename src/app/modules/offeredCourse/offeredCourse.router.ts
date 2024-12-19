import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { OfferedCourseValidation } from './offeredCourse.validation';
import { OfferedCourseController } from './offeredCourse.Controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(OfferedCourseValidation.createOfferedCourseValidation),
  OfferedCourseController.createOfferedCourse,
);


export const OfferedCourseRoutes = router;