import { model, Schema } from 'mongoose';
import { TCoursesMark, TEnrolledCourse } from './enrolledCourse.interface';
import { Grade } from './enrolledCourse.constant';

const CourseMarkSchema = new Schema<TCoursesMark>(
  {
    classTest1: {
      type: Number,
      default: 0,
    },
    midTerm: {
      type: Number,
      default: 0,
    },
    classTest2: {
      type: Number,
      default: 0,
    },
    finalTerm: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  },
);

const enrolledCourseSchema = new Schema<TEnrolledCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      ref: 'SemesterRegistration',
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    offeredCourse: {
      type: Schema.Types.ObjectId,
      ref: 'OfferedCourse',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
    isEnrolled: {
      type: Boolean,
      default: false,
    },
    courseMark: {
      type: CourseMarkSchema,
    },
    grade: {
      type: String,
      enum: Grade,
      default: 'N/A',
    },
    gradePoint: {
        type: Number,
        min : 0,
        max : 4,
        default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: true,
  },
);

export const EnrolledCourse = model<TEnrolledCourse>('enrolledCourse' , enrolledCourseSchema)
