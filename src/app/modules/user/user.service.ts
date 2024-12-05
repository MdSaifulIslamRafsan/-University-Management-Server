import config from "../../config";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
// import { TNewUser } from "./user.interface";
import { TUser } from "./user.interface";
import User from "./user.model";


const createStudentIntoDB = async (password : string ,studentData: TStudent) => {
  // const user : TNewUser = {}
  const userData : Partial<TUser> = {}
  //  if password is not provided then create a default password
  userData.password = password || (config.default_password as string)

  //  set student role 
  userData.role = "student";

  // set auto generated id
  userData.id = '2030100001'

  //  create new user and save student data in database
    const newUser = await User.create(userData);

    // create a new student

    if(Object.keys(newUser).length) {
      studentData.id = newUser.id;
      studentData.user = newUser._id;

      const newStudent = await Student.create(studentData);
      return newStudent;
      }

  };

export const userService = {
    createStudentIntoDB,
  };
