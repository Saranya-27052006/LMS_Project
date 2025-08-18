import { appConfig } from "../config/appConfig";
import { mongoConnection } from "../db/mongoConnection"; // your mongo connection util
import type { IUserDAO } from "./interfaces/IUserDAO";

export class DAOManager {
  static userDao: IUserDAO;

  static async init() {
    if (appConfig.DBType === "mongo") {
      await mongoConnection();
      const { default: UserDAOMongo } = await import("./mongoDb/UserDAOMongo");
      DAOManager.userDao = new UserDAOMongo();
    }
  }
}
