import { Request, Response, NextFunction } from 'express';
// import userSchemaValidation from './user.validation';
import { userService } from './user.service';

const createStudent = async (req: Request, res: Response , next : NextFunction) => {
  try {
    const { password , student: studentData} = req.body;
    // const zodParsedData = userSchemaValidation.parse(studentData);

    const result = await userService.createStudentIntoDB(password , studentData);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};

export const userController = {
    createStudent,
}