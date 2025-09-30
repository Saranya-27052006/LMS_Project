import { DAOManager } from "../dao/DAOManager";
import { UserService } from "./UserService";
import { MeetingService } from "./MeetingService";

export class ServiceManager {
  static userService: UserService;
  static meetingService: MeetingService;


  static async init() {
    await DAOManager.init();
    ServiceManager.userService = new UserService(DAOManager.userDao);
  }
}
