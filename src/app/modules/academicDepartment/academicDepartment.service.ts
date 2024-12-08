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


const getSingleAcademicDepartmentIntoDB = (id : string) => {
    const result = AcademicDepartment.findById(id);
    return result;
}

const updateAcademicDepartmentIntoDB = async(id : string , payload : TAcademicDepartment) => {
  /*   const isExist  = await AcademicDepartment.findById(id);
    if(!isExist) {
        throw new Error("Academic department not found");
    } */


    const result = AcademicDepartment.findByIdAndUpdate(id , payload, {new : true});
    return result;
}


export const AcademicDepartmentService = {
    createAcademicDepartmentIntoDB,
    getAcademicDepartmentIntoDB, 
    getSingleAcademicDepartmentIntoDB,
    updateAcademicDepartmentIntoDB

}