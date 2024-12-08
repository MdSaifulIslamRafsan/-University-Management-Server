import express from "express"
import { AcademicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";

const router = express.Router();

router.post('/' , validateRequest(AcademicFacultyValidation.createAcademicFacultyValidation) , AcademicFacultyController.createAcademicFaculty);

router.get('/', AcademicFacultyController.getAllAcademicFaculty)

router.get('/:id' , AcademicFacultyController.getSingleAcademicFaculty);

router.patch('/:id', validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidation) , AcademicFacultyController.updateAcademicFaculty)


export const AcademicFacultyRouter = router;