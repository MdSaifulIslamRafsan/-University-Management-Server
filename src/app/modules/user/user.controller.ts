import { Request, Response, NextFunction } from 'express';
// import userSchemaValidation from './user.validation';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createStudent = async (req: Request, res: Response , next : NextFunction) => {
  try {
    const { password , student: studentData} = req.body;
    // const zodParsedData = userSchemaValidation.parse(studentData);

    const result = await userService.createStudentIntoDB(password , studentData);

    sendResponse(res , {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Student is created successfully',
      data: result,

  })
  } catch (err) {
    next(err)
  }
};

export const userController = {
    createStudent,
}