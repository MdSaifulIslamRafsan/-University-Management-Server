import express from 'express'
import { academicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './AcademicSemester.validation';

const router = express.Router();

router.get('/create-academic-semester', validateRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema) , academicSemesterController.createAcademicSemester);

export const AcademicSemesterRoutes = router;