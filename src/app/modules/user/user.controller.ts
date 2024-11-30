import { Request, Response } from 'express';
import userSchemaValidation from './user.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const zodParsedData = userSchemaValidation.parse(studentData);

    const result = await 

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err || 'something went wrong',
      error: err,
    });
  }
};

export const userController = {
    createStudent,
}