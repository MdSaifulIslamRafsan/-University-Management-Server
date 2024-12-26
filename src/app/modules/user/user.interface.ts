import { Model } from 'mongoose';
import { UserRoles } from './user.constant';
export interface TUser {
    id: string;
    password : string;
    email : string;
    needsPasswordChange: boolean;
    passwordChangeAt: Date;
    role: 'admin' | 'student' | 'faculty';
    status: "in-progress" | "blocked";
    isDeleted : boolean;
}


export interface UserModel extends Model<TUser>{
    isUserExistByCustomId(id: string): Promise<TUser>
    isValidPassword(password: string , hashPassword: string): Promise<boolean>
    isDeleted(id: string) : Promise<TUser>,
    isUserBlocked(id : string) : Promise<TUser>
    isJWTTokenIssuedBeforePassword(issuedAt : number , passwordChangeAt : Date ) : Promise<boolean>

}

export type TUserRoles =  keyof typeof UserRoles

/* export interface TNewUser {
    role : string;
    password: string;
    id : string;
} */