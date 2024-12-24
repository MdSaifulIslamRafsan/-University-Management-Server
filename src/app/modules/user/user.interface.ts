import { Model } from 'mongoose';
export interface TUser {
    id: string;
    password : string;
    needsPasswordChange: boolean;
    role: 'admin' | 'student' | 'faculty';
    status: "in-progress" | "blocked";
    isDeleted : boolean;
}


export interface UserModel extends Model<TUser>{
    isUserExistByCustomId(id: string): Promise<TUser>
    isValidPassword(password: string , hashPassword: string): Promise<boolean>
    isDeleted(id: string) : Promise<TUser>
}

/* export interface TNewUser {
    role : string;
    password: string;
    id : string;
} */