import express from 'express';
import { userController } from './user.controller';
const router  = express.Router();

// Define routes
router.post('/create-student', userController.createStudent)


export const UserRoutes  = router;

