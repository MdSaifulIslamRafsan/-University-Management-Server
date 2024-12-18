import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semesterRegistrationStatus } from "./semesterRegistration.constant";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
    academicSemester : {
        type : Schema.Types.ObjectId,
        ref : 'AcademicSemester',
        required : true,
        unique : true
    },
    status : {
        type : String,
        enum : semesterRegistrationStatus,
        default : 'UPCOMING'
    }
})

const SemesterRegistration = model<TSemesterRegistration>('SemesterRegistration' , semesterRegistrationSchema)
export default SemesterRegistration;