import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../students/student.validation';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { UserRoles } from './user.constant';
import { userValidation } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';
const router = express.Router();

// Define routes
router.post(
  '/create-student',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.createStudentValidationSchema),
   
);

router.get(
  '/me',
  auth(UserRoles.admin, UserRoles.faculty, UserRoles.student),
  userController.getMe,
);

router.patch(
  '/change-status/:id',
  auth(UserRoles.admin),
  validateRequest(userValidation.changeStatusValidation),
  userController.changeStatus,
);

export const UserRoutes = router;
