import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppErrors';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import SemesterRegistration from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;
 

  const isExistAcademicSemester =
    await AcademicSemester.findById(academicSemester);

  if (!isExistAcademicSemester) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic Semester Not Found');
  }

  const isSemesterRegistration = await SemesterRegistration.findOne({
    academicSemester,
  });
  if(isSemesterRegistration){
    throw new AppError(StatusCodes.CONFLICT, 'Semester Registration Already Exists');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
};
