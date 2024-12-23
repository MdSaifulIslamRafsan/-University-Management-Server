import { Schema } from 'mongoose';
import { TAdmin, TAdminUserName } from './admin.interface';
import { bloodGroup } from './admin.constant';

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
  bloodGroup : {
    type: String,
    enum: bloodGroup,
  }
});
