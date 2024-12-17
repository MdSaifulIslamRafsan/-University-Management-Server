import { TCourse } from './course.interface';
import Course from './course.model';
import QueryBuilder from './../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';

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

  // step-1: basic course info update

  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
    },
  );

  // step-2: delete preRequisite course
  if (preRequisiteCourse && preRequisiteCourse.length > 0) {
    const deletedPreRequisite = preRequisiteCourse
      .filter((item) => item?.course && item?.isDeleted)
      .map((el) => el.course);

    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
      id,
      {
        $pull: { preRequisiteCourse: { course: { $in: deletedPreRequisite } } },
      },
      {
        new: true,
      },
    );

    // step-3: update new preRequisite course
    const newPreRequisite = preRequisiteCourse
      .filter((item) => item.course && !item.isDeleted);


    const newPreRequisiteCourse = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet: { preRequisiteCourse: { $each: newPreRequisite } },
      },
      {
        new: true,
        runValidators: true
      },
    );
  }

  const result =  await Course.findById(id).populate('preRequisiteCourse.course')

  return result;
};

export const courseService = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseFromDB,
};
