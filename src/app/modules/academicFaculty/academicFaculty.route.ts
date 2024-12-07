
import express from "express"
import { AcademicFacultyController } from "./academicFaculty.controller";

const router = express.Router();

router.post('/', AcademicFacultyController.createAcademicFaculty)

export const AcademicFacultyRouter = router;