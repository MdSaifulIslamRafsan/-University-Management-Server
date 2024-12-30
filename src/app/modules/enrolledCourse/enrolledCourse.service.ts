import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppErrors';
import OfferedCourse from '../offeredCourse/offeredCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourse } from './enrolledCourse.model';
import { Student } from '../students/student.model';
import mongoose from 'mongoose';

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
    student : student,
  });
  if (isStudentAlreadyEnrolled) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'Student already enrolled in the course',
    );
  }

  if(isOfferedCourseExists?.maxCapacity <= 0) {
    throw new AppError(StatusCodes.TOO_MANY_REQUESTS, 'Course is full');
  }

const session = await mongoose.startSession();

  try{
    session.startTransaction();

    const result = await EnrolledCourse.create([{
      semesterRegistration : isOfferedCourseExists?.semesterRegistration,
          academicSemester :isOfferedCourseExists?.academicSemester,
          academicFaculty : isOfferedCourseExists?.academicFaculty,
          academicDepartment : isOfferedCourseExists?.academicDepartment,
          offeredCourse : offeredCourse,
          course : isOfferedCourseExists?.course,
          student : student?._id,
          faculty : isOfferedCourseExists?.faculty,
          isEnrolled : true,
    }] , {
      session
    });
  
    if(!result) {
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create enrolled course');
    }
  
    const maxCapacity = isOfferedCourseExists?.maxCapacity;
  
    await OfferedCourse.findByIdAndUpdate(offeredCourse , {maxCapacity: maxCapacity - 1} , {new : true})

    await session.commitTransaction();
    await session.endSession();
    return result;
 
  }
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(err :any){
    await session.abortTransaction();
    await session.endSession();
    throw new Error(`Failed to start a session, ${err}`);
  }



};

export const EnrolledCourseService = {
  createdEnrolledCourseIntoDB,
};
