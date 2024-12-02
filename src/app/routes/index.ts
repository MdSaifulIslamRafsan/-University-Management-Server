 import express from 'express';
import { StudentRoutes } from '../modules/students/student.route';
import { UserRoutes } from '../modules/user/user.route';

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
 ];

 modulesRoutes.forEach(route => router.use(route.path , route.route));

 router.use("/students", StudentRoutes )



 export default router;