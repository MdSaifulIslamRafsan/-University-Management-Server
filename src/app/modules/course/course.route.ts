import express from 'express';
import { courseController } from './course.controller';
import validateRequest from '../../middleware/validateRequest';
import { courseValidation } from './course.validation';
const router = express.Router();

router.post('/', validateRequest(courseValidation.createCourseValidation) , courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getSingleCourse);
router.delete('/:id', courseController.deleteCourse)
router.patch('/:id', validateRequest(courseValidation.updateCourseValidation), courseController.updateCourse)
router.put('/:courseId/assign-faculty' , validateRequest(courseValidation.facultyCoursesValidation) , courseController.assignFaculties);

router.delete('/:courseId/remove-faculty',  validateRequest(courseValidation.facultyCoursesValidation) , courseController.deleteFacultiesCourse)

export const courseRoutes = router;