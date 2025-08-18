import type { IUser } from "../models/user";
import type { IUserDAO } from "../dao/interfaces/IUserDAO";

export class UserService {
  private userDao: IUserDAO;

  constructor(userDao: IUserDAO) {
    this.userDao = userDao;
  }

  async createUser(userData: IUser) {
    return await this.userDao.createUser(userData);
  }

  async getAllUsers() {
    return await this.userDao.findAll();
  }
}
