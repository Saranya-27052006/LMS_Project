import { DAOManager } from "../dao/DAOManager";
import { UserService } from "./UserService";

export class ServiceManager {
  static userService: UserService;

  static async init() {
    await DAOManager.init();
    ServiceManager.userService = new UserService(DAOManager.userDao);
  }
}
