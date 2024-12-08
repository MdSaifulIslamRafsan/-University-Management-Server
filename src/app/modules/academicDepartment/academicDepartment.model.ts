import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>({
    name : {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty : {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
    }
},
    {
        timestamps: true
    }
);

const AcademicDepartment =  model<TAcademicDepartment>("academicDepartment" , AcademicDepartmentSchema);

export default AcademicDepartment;