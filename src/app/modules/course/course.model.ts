import { model, Schema } from 'mongoose';
import { TCourse, TCourseFaculties, TPreRequisiteCourse } from './course.interface';

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourse>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});



const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: Number,
    required: true,
    trim: true,
  },
  credits: {
    type: Number,
    required: true,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  preRequisiteCourse: [preRequisiteCourseSchema],
});

export const Course = model<TCourse>('Course', courseSchema)



const courseFacultySchema = new Schema<TCourseFaculties>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true
  },
  faculties: [{
    type: Schema.Types.ObjectId,
    ref: 'Faculty',
  }],
})
export const CourseFaculty = model<TCourseFaculties>('CourseFaculty', courseFacultySchema)
