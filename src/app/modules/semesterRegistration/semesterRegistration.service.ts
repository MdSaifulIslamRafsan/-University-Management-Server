import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppErrors';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import SemesterRegistration from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if there any registered semester that is already "UPCOMING" or 'ONGOING'

  const ongoingOrUpcomingSemesters = await SemesterRegistration.findOne({
    $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
  });
  if (ongoingOrUpcomingSemesters) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `Previous Semester Registration is Still ${ongoingOrUpcomingSemesters.status}`,
    );
  }

  const isExistAcademicSemester =
    await AcademicSemester.findById(academicSemester);

  if (!isExistAcademicSemester) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic Semester Not Found');
  }

  const isSemesterRegistration = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistration) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'Semester Registration Already Exists',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find({}).populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;

  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationFromDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);

  const currentSemesterStatus = isSemesterRegistrationExist?.status;
  const requestStatus = payload?.status;

  if (!isSemesterRegistrationExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Semester Registration Not Found',
    );
  }
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Semester Registration is Ended');
  }
  if (currentSemesterStatus === RegistrationStatus.UPCOMING  && requestStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      `You Cannot directly change status from ${currentSemesterStatus} to ${requestStatus}`,
    );
  }
  if (currentSemesterStatus === RegistrationStatus.ONGOING && requestStatus === RegistrationStatus.UPCOMING) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      `You Cannot directly change status from ${currentSemesterStatus} to ${requestStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationFromDB,
};
