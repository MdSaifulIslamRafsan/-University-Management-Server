import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// pre save middleware/ hook : will work on create()  save()
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save  data');

  // hashing password and save into DB
  this.password = await bcrypt.hash(this.password, 10);
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

/*  userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  }); */

// [ {$match: { isDeleted : {  $ne: : true}}}   ,{ '$match': { id: '123456' } } ]

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
/*   userSchema.statics.isUserExistByCustomId = async function (id: string) {
    const existingUser = await User.findOne({ id });
    return existingUser;
  }; */

userSchema.static(
  'isUserExistByCustomId',
  async function isUserExistByCustomId(id: string) {
    const existingUser = await User.findOne({ id }).select("+password");
    return existingUser;
  },
);

userSchema.statics.isDeleted = async function (id: string) {
  return await User.findOne({ id, isDeleted: true });
};

userSchema.static('isUserBlocked', async function isUserBlocked(id: string) {
  return await User.findOne({ id, status: 'blocked' });
});

userSchema.statics.isValidPassword = async function (
  password: string,
  hashPassword: string,
) {
  return await bcrypt.compare(password, hashPassword);
};

userSchema.statics.isJWTTokenIssuedBeforePassword = async function (
  issuedAt: number,
  passwordChangeAt: Date,
) {
  const passwordChangedTime = new Date(passwordChangeAt).getTime() / 1000;
  return issuedAt < passwordChangedTime


  // return new Date(issuedAt * 1000) < passwordChangeAt
}

const User = model<TUser, UserModel>('User', userSchema);
export default User;
