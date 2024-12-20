import { Types } from 'mongoose';

export type Days = 
  | "sat"
  | "sun"
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri";


export interface TOfferedCourse {
  semesterRegistration: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: Days[];
  startTime: string;
  endTime: string;
}
