import { appConfig } from "../Config/appConfig";
import { mongoConnection } from "../db/mongoConnection";
import type { IUserDAO } from "./interfaces/IUserDAO";
import type { IMeetingDAO } from "./interfaces/IMeetingDAO";

export class DAOManager {
  static userDao: IUserDAO;
  static meetingDao:IMeetingDAO;
  

  static async init() {
    if (appConfig.DBType === "mongo") {
      await mongoConnection();
      const { default: UserDAOMongo } = await import("./mongoDb/UserDAOMongo");
      DAOManager.userDao = new UserDAOMongo();
      const { default: MeetingDAOMongo } = await import("./mongoDb/MeetingDAOMongo");
      DAOManager.meetingDao = new MeetingDAOMongo()

    }
  }
}
