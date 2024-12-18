import { TCourse, TCourseFaculties } from './course.interface';

import QueryBuilder from './../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import mongoose from 'mongoose';
import AppError from '../../errors/AppErrors';
import { StatusCodes } from 'http-status-codes';
import { Course, CourseFaculty } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourse.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourse.course',
  );
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const updateCourseFromDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // step-1: basic course info update

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updateBasicCourseInfo) {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to update course.',
      );
    }

    // step-2: delete preRequisite course
    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      const deletedPreRequisite = preRequisiteCourse
        .filter((item) => item?.course && item?.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletedPreRequisite } },
          },
        },
        { validateRequest: true, new: true, session },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'Failed to delete preRequisite course.',
        );
      }

      // step-3: update new preRequisite course
      const newPreRequisite = preRequisiteCourse.filter(
        (item) => item.course && !item.isDeleted,
      );
      console.log(newPreRequisite);
      const newPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPreRequisite } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newPreRequisiteCourse) {
        throw new AppError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'Failed to update preRequisite course.',
        );
      }

      await session.commitTransaction();
      await session.endSession();
      const result = await Course.findById(id).populate(
        'preRequisiteCourse.course',
      );
      return result;
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Course not found or not found in the database',
    );
  }
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculties>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const deleteFacultiesCourseFromDB = async (
  id: string,
  payload: Partial<TCourseFaculties>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: {
        faculties: { $in: payload },
      },
    },
    { new: true },
  );
  return result;
};

export const courseService = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  deleteFacultiesCourseFromDB,
};
