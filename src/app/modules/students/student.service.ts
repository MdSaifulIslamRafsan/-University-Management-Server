import mongoose from 'mongoose';
import { Student } from './student.model';



const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { _id: new mongoose.Types.ObjectId(id) } }]);

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({_id : new mongoose.Types.ObjectId(id)}, { isDeleted: true });
  return result;
};


export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};