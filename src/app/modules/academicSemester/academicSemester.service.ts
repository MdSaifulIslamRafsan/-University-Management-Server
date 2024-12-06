import { academicSemesterCodeAndNameMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";



const createAcademicSemesterIntoDB = async (payload : TAcademicSemester) => {

    

    if(academicSemesterCodeAndNameMapper[payload.name] !== payload.code){
        throw new Error("Semester code doesn't match");
    }

    const result = await AcademicSemester.create(payload);
    return result;
};

const getAllAcademicSemesterIntoDB = async () => {
    const result = await AcademicSemester.find({});
    return result;
}
const getSingleAcademicSemesterIntoDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result; 
}

const updateAcademicSemesterIntoDB = async (id: string , payload : TAcademicSemester) => {
 
    if(  payload.name &&
        payload.code && academicSemesterCodeAndNameMapper[payload.name] !== payload.code){
        throw new Error("Semester code doesn't match");
    }
    const result = await AcademicSemester.findByIdAndUpdate({ _id: id } , payload , {new: true});
    if (!result) {
        throw new Error("Failed to update the semester");
    }
    return result;
}


export const AcademicSemesterService = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterIntoDB,
    getSingleAcademicSemesterIntoDB,
    updateAcademicSemesterIntoDB
}