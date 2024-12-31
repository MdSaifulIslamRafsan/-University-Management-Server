import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppErrors';
import OfferedCourse from '../offeredCourse/offeredCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourse } from './enrolledCourse.model';
import { Student } from '../students/student.model';
import mongoose from 'mongoose';
import SemesterRegistration from '../semesterRegistration/semesterRegistration.model';
import { Course } from '../course/course.model';

const createdEnrolledCourseIntoDB = async (
  id: string,
  payload: TEnrolledCourse,
) => {
  const { offeredCourse } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Offered course not found');
  }

  const student = await Student.findOne({ id }, { _id: 1 });

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    offeredCourse,
    semesterRegistration: isOfferedCourseExists.semesterRegistration,
    student: student,
  });
  if (isStudentAlreadyEnrolled) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'Student already enrolled in the course',
    );
  }

  if (isOfferedCourseExists?.maxCapacity <= 0) {
    throw new AppError(StatusCodes.TOO_MANY_REQUESTS, 'Course is full');
  }

    // check total credits exceeds maxCredit
    const course = await Course.findById(isOfferedCourseExists.course);
    const currentCredit = course?.credits;

  // check total credits exceeds maxCredit

  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists?.semesterRegistration,
  ).select('maxCredit');

  const maxCredit = semesterRegistration?.maxCredit;

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student?._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);
   //  total enrolled credits + new enrolled course credit > maxCredit
   const totalCredits =
   enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;

 if (totalCredits && maxCredit && totalCredits + currentCredit > maxCredit) {
   throw new AppError(
     StatusCodes.BAD_REQUEST,
     'You have exceeded maximum number of credits !',
   );
 }


  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists?.semesterRegistration,
          academicSemester: isOfferedCourseExists?.academicSemester,
          academicFaculty: isOfferedCourseExists?.academicFaculty,
          academicDepartment: isOfferedCourseExists?.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists?.course,
          student: student?._id,
          faculty: isOfferedCourseExists?.faculty,
          isEnrolled: true,
        },
      ],
      {
        session,
      },
    );

    if (!result) {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to create enrolled course',
      );
    }

    const maxCapacity = isOfferedCourseExists?.maxCapacity;

    await OfferedCourse.findByIdAndUpdate(
      offeredCourse,
      { maxCapacity: maxCapacity - 1 },
      { new: true, session },
    );

    await session.commitTransaction();
    await session.endSession();
    return result;
  } 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(`Failed to start a session, ${err}`);
  }
};

export const EnrolledCourseService = {
  createdEnrolledCourseIntoDB,
};
