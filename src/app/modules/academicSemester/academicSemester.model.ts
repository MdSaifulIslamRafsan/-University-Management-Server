import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constant";
import AppError from "../../errors/AppErrors";
import { StatusCodes } from "http-status-codes";


const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        required: true,
        enum : AcademicSemesterName
    },
    year:{
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        enum : AcademicSemesterCode
    },
   startMonth: {
        type: String,
        enum: Months,
        required: true
   },
   endMonth: {
        type: String,
        enum: Months,
        required: true
   }
},
{
    timestamps : true, 
})

academicSemesterSchema.pre('save' , async function(next){
    const isExist = await AcademicSemester.findOne({
        year: this.year,
        name: this.name
    })

    if (isExist) {
        throw new AppError(StatusCodes.NOT_FOUND,"academic semester already exist");
        
    }

    next();
})


const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);

export default AcademicSemester;