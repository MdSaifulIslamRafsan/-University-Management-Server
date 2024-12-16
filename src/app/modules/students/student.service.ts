import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppErrors';
import { StatusCodes } from 'http-status-codes';
import { TStudent } from './student.interface';
import User from '../user/user.model';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  console.log('base query', query);
  let searchTerm = '';

  const queryObj = { ...query };

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const studentSearchAbelQuery = ['email', 'name.firstName', 'presentAddress'];

  const searchQuery = Student.find({
    $or: studentSearchAbelQuery.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });
  const excludedFields = ['searchTerm', 'sort' , 'limit' , 'page' , 'fields'];
  excludedFields.forEach((field) => delete queryObj[field]);

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });

  let sort = '-createdAt';
  if (query?.sort) {
    sort = query?.sort as string;
  }

  const sortQuery =  filterQuery.sort(sort);

  let limit = 1;
  let page = 1;
  let skip = 0;

  if (query?.limit) {
    limit = parseInt(query?.limit as string) ;
  }

  if(query?.page){
    page = parseInt(query?.page as string) ;
    skip = (page - 1) * limit;
  }
  
const paginateQuery =  sortQuery.skip(skip);
const limitQuery =  paginateQuery.limit(limit);

// fields limiting query

let fields = '-__v'

if(query?.fields){
  fields = (query?.fields as string).split(',').join(' ')
}

const fieldsQuery = await limitQuery.select(fields);
  return fieldsQuery;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({ path: 'academicDepartment', populate: 'academicFaculty' });
  return result;
};

const updatedStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, localGuardian, guardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  // create session

  const session = await mongoose.startSession();

  try {
    // start Transaction
    session.startTransaction();

    // Transaction - 1
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true },
    );
    if (!deletedStudent) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Student not found');
    }
    // Transaction - 2
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true },
    );
    if (!deletedUser) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to Delete');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updatedStudentFromDB,
};
