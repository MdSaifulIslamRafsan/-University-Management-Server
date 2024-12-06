import express from 'express'
import { academicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './AcademicSemester.validation';

const router = express.Router();

router.post('/create-academic-semester', validateRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema) , academicSemesterController.createAcademicSemester);
router.get('/' , academicSemesterController.getAllAcademicSemester);

router.get('/:id' , academicSemesterController.getSingleAcademicSemester)

export const AcademicSemesterRoutes = router;