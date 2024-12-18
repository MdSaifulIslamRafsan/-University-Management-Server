import express from 'express'
import validateRequest from '../../middleware/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { semesterRegisterValidation } from './semesterRegistration.validation';

const router = express.Router();


router.post('/' , validateRequest(semesterRegisterValidation.createSemesterRegistrationValidation), SemesterRegistrationController.createSemesterRegistration)
router.get('/', SemesterRegistrationController.getSemesterRegistrationById)


export const SemesterRegistrationRoutes = router;