 import express from 'express';
import { StudentRoutes } from '../modules/students/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { courseRoutes } from '../modules/course/course.route';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoutes } from '../modules/offeredCourse/offeredCourse.router';
import { AuthRoutes } from '../modules/auth/auth.router';

 const router = express.Router();

 const modulesRoutes = [
    {
        path : '/students',
        route : StudentRoutes
    },
    {
        path: '/users',
        route: UserRoutes,
      },
    {
        path: '/academic-semester',
        route: AcademicSemesterRoutes,
      },
    {
        path: '/academic-faculty',
        route: AcademicFacultyRoutes,
      },
      {
        path : '/academic-department',
        route : AcademicDepartmentRoutes
      },
      {
        path : '/course',
        route : courseRoutes
      },
      {
        path : '/semester-registration',
        route : SemesterRegistrationRoutes
      },
      {
        path : '/offered-course',
        route : OfferedCourseRoutes
      },
      {
        path : '/auth',
        route : AuthRoutes
      },
 ];

 modulesRoutes.forEach(route => router.use(route.path , route.route));

//  router.use("/students", StudentRoutes );



 export default router;