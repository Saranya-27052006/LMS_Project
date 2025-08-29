// src/dao/mongoDb/userDAO.ts
import type { IUser } from "../../models/user";
import type { IUserDAO } from "../interfaces/IUserDAO";
import UserModel from "../../models/user";

export default class UserDAOMongo implements IUserDAO {
  async createUser(user: IUser): Promise<IUser> {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return await UserModel.find();
  }

  async findById(userId: string): Promise<IUser | null> {
    return await UserModel.findById(userId);
  }
  async updateRole(userId: string, updateField: any): Promise<IUser | null> {
    return await UserModel.findOneAndUpdate({ _id: userId }, updateField, { new: true }).lean();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email: email });
  }

  async findByGoogleId(googleId: string): Promise<IUser | null> {
    return await UserModel.findOne({ googleId: googleId })
  }
}
