 import express from 'express';
import { StudentRoutes } from '../modules/students/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';

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
        route: AcademicFacultyRouter,
      },
 ];

 modulesRoutes.forEach(route => router.use(route.path , route.route));

//  router.use("/students", StudentRoutes );



 export default router;