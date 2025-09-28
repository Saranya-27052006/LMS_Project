import { DAOManager } from "../dao/DAOManager";
import { UserService } from "./UserService";
import { ReportService } from "./ReportService";
import { MeetingService } from "./MeetingService";
import { HackathonService } from "./HackathonService";



export class ServiceManager {
  static userService: UserService;
  static reportService: ReportService;
  static meetingService: MeetingService;
  static hackathonService: HackathonService
 
  

  static async init() {
    await DAOManager.init();
    ServiceManager.userService = new UserService(DAOManager.userDao);
     ServiceManager.reportService = new ReportService(DAOManager.reportDao);
    ServiceManager.meetingService = new MeetingService(DAOManager.meetingDao);
   
    ServiceManager.hackathonService = new HackathonService(DAOManager.hackathonDao)

  }
}
