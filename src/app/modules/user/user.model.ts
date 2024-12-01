import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';


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
        default: true,
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

// pre save middleware/ hook : will work on create()  save()
userSchema.pre('save', async function (next) {
    // console.log(this, 'pre hook : we will save  data');
  
    // hashing password and save into DB
    this.password = await bcrypt.hash(
      this.password, 10
    );
    next();
  });
  
  // post save middleware / hook
  userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });

  // Query Middleware
  userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });
  
  userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });
  
  // [ {$match: { isDeleted : {  $ne: : true}}}   ,{ '$match': { id: '123456' } } ]
  
  userSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
  });
  
  //creating a custom static method
  userSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await User.findOne({ id });
    return existingUser;
  };

const User = model<TUser>('User', userSchema);
export default User;