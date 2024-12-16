import { Schema, Types } from "mongoose";
import { TPreRequisiteCourse } from "./course.interface";

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourse>({
    course: {
        type: Schema.Types.ObjectId,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

})
