import { TAcademicDepartment } from "./academicDepartment.interface";
import AcademicDepartment from "./academicDepartment.model";


const createAcademicDepartmentIntoDB = (payload : TAcademicDepartment) => {
    const result = AcademicDepartment.create(payload);
    return result;
}

export const AcademicDepartmentService = {
    createAcademicDepartmentIntoDB,

}