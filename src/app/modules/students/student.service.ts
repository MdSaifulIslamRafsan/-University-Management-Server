import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  /* const result = await Student.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup : {
        from: 'admissionSemester',
        localField: 'admissionSemester',
        foreignField: '_id',
        as: 'admissionSemester'
      }
    }
  ]); */
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({ path: 'academicDepartment', populate: 'academicFaculty' });
  return result;
};




const deleteStudentFromDB = async (id: string) => {


  const result = await Student.findByIdAndUpdate(
    { id: id },
    { isDeleted: true },
    {new : true}
  );
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
