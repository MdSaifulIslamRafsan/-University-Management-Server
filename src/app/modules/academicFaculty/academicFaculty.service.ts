import { TAcademicFaculty } from "./academicFaculty.interface";
import AcademicFaculty from "./academicFaculty.model";

const createAcademicFacultyIntoDB = (payload : TAcademicFaculty) => {
    const result = AcademicFaculty.create(payload)
    return result;
}

const getAllAcademicFacultyIntoDB = () => {
    const result = AcademicFaculty.find({});
    return result;
}

export const AcademicFacultyService = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultyIntoDB
}