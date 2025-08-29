import type { IUser } from "../../models/user";

export interface IUserDAO {
  createUser(user: IUser): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  findById(userId:string):Promise<IUser | null>;
  updateRole(userId:String,role:string):Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;  
  findByGoogleId(googleId: string): Promise<IUser | null>;
}
