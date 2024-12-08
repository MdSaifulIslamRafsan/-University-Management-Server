import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post('/', validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidation) , AcademicDepartmentController.createAcademicDepartment);

router.get('/', AcademicDepartmentController.getAcademicDepartment);
router.get('/:id' , AcademicDepartmentController.getSingleAcademicDepartment);

router.patch('/:id' , validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidation) , AcademicDepartmentController.updatedAcademicDepartment);

export const AcademicDepartmentRoutes = router;