import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppErrors';
import { StatusCodes } from 'http-status-codes';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  /* const result = await Student.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup : {
        from: 'admissionSemester',
        localField: 'admissionSemester',
        foreignField: '_id',
        as: 'admissionSemester'
      }
    }
  ]); */
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({ path: 'academicDepartment', populate: 'academicFaculty' });
  return result;
};



const deleteStudentFromDB = async (id: string) => {
  // create session 

  const session = await mongoose.startSession();

  // start Transaction
   session.startTransaction();

 try {
  const deletedStudent = await Student.findByIdAndUpdate(
    { id: id },
    { isDeleted: true },
    {new : true}
  );
  if (!deletedStudent) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student not found');
  }
  await session.commitTransaction();
  await session.endSession();
  return deletedStudent;
 } catch (error) {
  await session.abortTransaction();
  await session.endSession();
  throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to Delete')

 }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
