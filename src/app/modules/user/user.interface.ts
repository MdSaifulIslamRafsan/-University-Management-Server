
export interface TUser {
    id: string;
    password : string;
    needsPasswordChange: boolean;
    role: "admin" | "faculty" | "student";
    status: "in-progress" | "blocked";
    isDeleted : boolean;
}