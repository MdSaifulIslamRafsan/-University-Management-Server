import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";


const AcademicFacultySchema = new Schema<TAcademicFaculty> ({
    name : {
        type : String,
        required : true,
        unique : true
    }
},{
    timestamps : true,
})

const AcademicFaculty = model<TAcademicFaculty>('AcademicFaculty' , AcademicFacultySchema);

export default AcademicFaculty;