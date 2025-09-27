import { appConfig } from "../Config/appConfig";
import { mongoConnection } from "../db/mongoConnection";
import type { IHackathonDAO } from "./interfaces/IHackathonDAO";
import type { IMeetingDAO } from "./interfaces/IMeetingDAO";
import type { IReportDAO } from "./interfaces/IReportDAO";
import type { IUserDAO } from "./interfaces/IUserDAO";

export class DAOManager {
  static userDao: IUserDAO;
  static meetingDao:IMeetingDAO;
  static hackathonDao:IHackathonDAO
  static reportDao:IReportDAO;
  

  static async init() {
    if (appConfig.DBType === "mongo") {
      await mongoConnection();
      const { default: UserDAOMongo } = await import("./mongoDb/UserDAOMongo");
      DAOManager.userDao = new UserDAOMongo();
      const { default: MeetingDAOMongo } = await import("./mongoDb/MeetingDAOMongo");
      DAOManager.meetingDao = new MeetingDAOMongo()
      const { default: ReportDAOMongo } = await import("./mongoDb/ReportDAOMongo");
      DAOManager.reportDao = new ReportDAOMongo()
      const { default: HackathonDAOMongo } = await import("./mongoDb/HackathonDAOMongo")
      DAOManager.hackathonDao = new HackathonDAOMongo()

    }
  }
}
