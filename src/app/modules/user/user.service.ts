import { StatusCodes } from "http-status-codes";
import config from "../../config";
import AppError from "../../errors/AppErrors";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
// import { TNewUser } from "./user.interface";
import { TUser } from "./user.interface";
import User from "./user.model";
import { generatedStudentId } from "./user.utils";
import mongoose from "mongoose";


const createStudentIntoDB = async (password : string ,payload: TStudent) => {
  // const user : TNewUser = {}
  const userData : Partial<TUser> = {}
  //  if password is not provided then create a default password
  userData.password = password || (config.default_password as string)

  //  set student role 
  userData.role = "student";



  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);

if(!admissionSemester){
  throw new AppError(StatusCodes.NOT_FOUND,'admissionSemester not found')
}



// create session
const session = await mongoose.startSession();


  try {

    session.startTransaction();
    // set auto generated id
  userData.id = await generatedStudentId(admissionSemester)

  //  create new user and save student data in database [transaction-1]
    const newUser = await User.create([userData] , { session});
   

    // create a new student
    if(!newUser.length) {
      throw new AppError( StatusCodes.BAD_REQUEST,'Failed to create User')
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // transaction -2 
      const newStudent = await Student.create([payload] , {session});
      if(!newStudent.length){
        throw new AppError(StatusCodes.BAD_REQUEST,'Failed to create Student')
      }

      await session.commitTransaction();
      await session.endSession();
      return newStudent;

  } catch (error) {
    session.abortTransaction();
    session.endSession()
    throw new AppError(StatusCodes.BAD_REQUEST, `failed to create student ${error}`)
  }


  
  };



export const userService = {
    createStudentIntoDB,
  };
