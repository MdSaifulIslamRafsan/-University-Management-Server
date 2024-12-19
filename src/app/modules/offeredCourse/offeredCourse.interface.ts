import { Types } from "mongoose";

export interface TOfferedCourse {
    semesterRegistration : Types.ObjectId;
    academicSemester : Types.ObjectId;
    academicFaculty : Types.ObjectId;
    academicDepartment : Types.ObjectId;
    course : Types.ObjectId;
    faculty : Types.ObjectId;
    maxCapacity :number;
    section : number;
    
    startTime : string;
    endTime : string;
}