import { Types } from 'mongoose';

export type TAdminUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TAdminGender = 'male' | 'female' | 'other';
export type TAdminBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export interface TAdmin {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TAdminUserName;
  gender: TAdminGender;
  bloodGroup?: TAdminBloodGroup;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
}
