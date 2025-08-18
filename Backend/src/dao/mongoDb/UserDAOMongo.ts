// src/dao/mongoDb/userDAO.ts
import type { IUser } from "../../models/user";
import type { IUserDAO } from "../interfaces/IUserDAO";
import UserModel from "../../models/user"; // Mongoose model

export default class UserDAOMongo implements IUserDAO {
  async createUser(user: IUser): Promise<IUser> {
    const newUser = new UserModel(user);
    return await newUser.save(); // ✅ saves to MongoDB
  }

  async findAll(): Promise<IUser[]> {
    return await UserModel.find(); // ✅ retrieves all users
  }
}
