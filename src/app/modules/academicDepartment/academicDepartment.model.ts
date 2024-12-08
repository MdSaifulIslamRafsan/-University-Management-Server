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

AcademicDepartmentSchema.pre('save', async function(next){
    const isExist = await AcademicDepartment.findOne({
        name : this.name
    })
    if(isExist){
        throw new Error("Academic department already exists")
    }
    next()
})

AcademicDepartmentSchema.pre('findOneAndUpdate', async function(next){
    const id = this.getQuery();
    const isExist = await AcademicDepartment.findOne(id);

    if(!isExist){
        throw new Error("Academic department not found")
    }
    next();
})

const AcademicDepartment =  model<TAcademicDepartment>("academicDepartment" , AcademicDepartmentSchema);

export default AcademicDepartment;