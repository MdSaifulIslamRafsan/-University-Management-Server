import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";


 const userSchema = new Schema<TUser>({
    id: {
        type : String,
         required : true,
         unique : true
    },
    password :{
        type : String, 
        required : true
    },
    needsPasswordChange : {
        type : Boolean,
        required : true
    },
    role : {
        type : String, 
        enum : ['admin', 'student' , 'faculty'] ,
        required : true
    },
    status : {
        type : String,
        enum : ["in-progress" , "blocked"],
        default : "in-progress"
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},
{
    timestamps : true
}
)

const User = model<TUser>('User', userSchema);
export default User;