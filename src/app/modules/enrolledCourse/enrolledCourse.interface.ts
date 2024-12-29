import { Types } from "mongoose";

export type TGrade = 'A' | 'B' | 'C' | 'D' | 'F' | 'N/A';

export interface TCoursesMark{
    classTest1 : number;
    midTerm : number;
    classTest2 : number;
    finalTerm : number;
}

export interface TEnrolledCourse {
    semesterRegistration : Types.ObjectId;
    academicSemester : Types.ObjectId;
    academicFaculty : Types.ObjectId;
    academicDepartment : Types.ObjectId;
    offeredCourse : Types.ObjectId;
    course : Types.ObjectId;
    student : Types.ObjectId;
    faculty : Types.ObjectId;
    isEnrolled : boolean;
    courseMark : TCoursesMark;
    grade : TGrade ;
    gradePoint : number;
    isCompleted : boolean;


}