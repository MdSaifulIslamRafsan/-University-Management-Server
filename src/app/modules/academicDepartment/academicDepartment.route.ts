import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post('/', AcademicDepartmentController.createAcademicDepartment)



export const AcademicDepartmentRoutes = router;