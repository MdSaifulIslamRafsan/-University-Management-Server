import { TAcademicDepartment } from "./academicDepartment.interface";
import AcademicDepartment from "./academicDepartment.model";


const createAcademicDepartmentIntoDB = (payload : TAcademicDepartment) => {
    const result = AcademicDepartment.create(payload);
    return result;
}

const getAcademicDepartmentIntoDB = () => {
    const result = AcademicDepartment.find({});
    return result;
}

export const AcademicDepartmentService = {
    createAcademicDepartmentIntoDB,
    getAcademicDepartmentIntoDB

}