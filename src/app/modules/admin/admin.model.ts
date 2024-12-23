import { model, Schema } from 'mongoose';
import { TAdmin, TAdminUserName } from './admin.interface';
import { bloodGroup, Gender } from './admin.constant';

const userNameSchema = new Schema<TAdminUserName>({
  firstName: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
  },
});

const adminSchema = new Schema<TAdmin>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },
  designation: {
    type: String,
    required: true,
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: bloodGroup,
  },
  gender: {
    type: String,
    enum: Gender,
    required: true,
  },
  dateOfBirth : {
    type : Date
  },
  email : {
    type: String,
    required: true,
    unique: true,
  },
  contactNo : {
    type: String,
    required: true,
    unique: true,
  },
  emergencyContactNo:{
    type: String,
    required: true,
    unique: true,
  },
  presentAddress : {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  profileImg: { type: String },
  isDeleted : {
    type: Boolean,
    default: false,
  }


});

const Admin = model<TAdmin>('admin', adminSchema);
export default Admin;
