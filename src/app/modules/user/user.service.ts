import config from "../../config";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
// import { TNewUser } from "./user.interface";
import { TUser } from "./user.interface";
import User from "./user.model";
import { generatedStudentId } from "./user.utils";


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
  throw new Error('admissionSemester not found')
}


  // set auto generated id
  userData.id = await generatedStudentId(admissionSemester)

  //  create new user and save student data in database
    const newUser = await User.create(userData);
   

    // create a new student
// this line i don't understand
    if(Object.keys(newUser).length) {
      payload.id = newUser.id;
      payload.user = newUser._id;

      const newStudent = await Student.create(payload);
      return newStudent;
      }

  };



export const userService = {
    createStudentIntoDB,
  };
