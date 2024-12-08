import { TAcademicFaculty } from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFacultyIntoDB = (payload: TAcademicFaculty) => {
  const result = AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultyIntoDB = () => {
  const result = AcademicFaculty.find({});
  return result;
};

const singleAcademicFacultyIntoDB = (id: string) => {
  const result = AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFacultyIntoDB = (id: string, payload: TAcademicFaculty) => {
  const result = AcademicFaculty.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const AcademicFacultyService = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyIntoDB,
  singleAcademicFacultyIntoDB,
  updateAcademicFacultyIntoDB
};
