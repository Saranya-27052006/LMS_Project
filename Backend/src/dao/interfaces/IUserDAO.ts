import type { IUser } from "../../models/user";

export interface IUserDAO {
  createUser(user: IUser): Promise<IUser>;
  findAll(): Promise<IUser[]>;
}
