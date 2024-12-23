import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppErrors';
import SemesterRegistration from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import OfferedCourse from './offeredCourse.model';
import AcademicFaculty from '../academicFaculty/academicFaculty.model';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { hasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    days,
    startTime,
    endTime,
    // faculty,
  } = payload;

  // check if the semester registration is exists
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Semester registration not found',
    );
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  // check if the academic faculty is exists
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic faculty not found');
  }

  //   check if the academic department is exists

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic department not found');
  }

  // check if the course is exists

  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Course not found');
  }

  /* // check if the faculty is exists

const isFacultyExists = await AcademicFaculty.findById(faculty);

if (!isFacultyExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found');
} */

  //   check if the academic department is belongs to the academic faculty

  const isDepartmentBelongsToFaculty = AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongsToFaculty) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      `This ${isAcademicDepartmentExists.name} is not belongs to ${isAcademicFacultyExists.name} }`,
    );
  }

  // check if the same offered course same section in same registrar semester exists

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameCourse =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });
  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameCourse) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'Same offered course same section in same registrar semester exists',
    );
  }

  // get the schedules of the faculties
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    days: { $in: days },
    // faculty
  }).select('days , startTime, endTime');

  const newSchedules = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignSchedules, newSchedules)) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'This faculty is not available at that time ! choose other time or date range',
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const updateOfferedCourseFromDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Offered course not found');
  }

  /*  const isExistFaculty = await Faculty.findById(faculty)

  if(!isExistFaculty){
    throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found');
  } */

  const semesterRegistration = isOfferedCourseExists.
  semesterRegistration;

  const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistration);

  if(semesterRegistrationStatus?.status !== "UPCOMING"){
    throw new AppError(StatusCodes.FORBIDDEN, "The semester registration is not in 'UPCOMING' status. You can't update the offered course.");
  }


  // get the schedules of the faculties
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    days: { $in: days },
    // faculty
  }).select('days , startTime, endTime');

  const newSchedules = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignSchedules, newSchedules)) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'This faculty is not available at that time ! choose other time or date range',
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
  updateOfferedCourseFromDB,
};
