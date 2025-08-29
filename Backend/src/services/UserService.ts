import type { IUser } from "../models/user";
import type { IUserDAO } from "../dao/interfaces/IUserDAO";
import bcrypt from "bcrypt"
import AuthService from "./AuthService";
import { verifyAuth } from "../utils/OuthVerify";

export class UserService {
  private userDao: IUserDAO;

  constructor(userDao: IUserDAO) {
    this.userDao = userDao;
  }

  async createUser(userData: IUser) {
    const isExist = await this.userDao.findByEmail(userData.email)
    if (isExist) {
      throw new Error("User is already exists")
    }
    if (!userData.password) {
      throw new Error("Password required");
    }
    const hashed = await bcrypt.hash(userData.password, 10);
    return await this.userDao.createUser({ ...userData, password: hashed });
  }

  async login(email: string, password: string) {
    const user = await this.userDao.findByEmail(email)
    if (!user) {
      throw new Error("User not exists")
    }
    if (!password || !user.password) {
      throw new Error("Password is missing");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new Error("Invalid password");
    }
    return AuthService.generateToken(user);
  }

  async googleLogin(idToken: string) {

    const payload = await verifyAuth(idToken);
    if (!payload) {
      throw new Error("GoogleId verification failed");
    }
    const { sub: googleId, email, name, picture } = payload;
    if (!email) {
      throw new Error("Email is required from Google payload");
    }
    let user = await this.userDao.findByGoogleId(googleId);
    if (!user) {
      user = await this.userDao.createUser({
        googleId,
        email,
        name: name || "Google User",
        picture: picture || "",

        notification: [],
        role: ""
      });
    }
    const token = await AuthService.generateToken(user);
    return { token, user };
  }

  async getAllUsers() {
    return await this.userDao.findAll();
  }

  async getUserById(userId: string) {
    return await this.userDao.findById(userId)
  }

  async changeUserRole(userId: string, role: string) {
    let updateData: any = { role: role };
    let unsetData: any = {};

    if (role === "student") {
      updateData.enrolledCourses = [];
      unsetData = { batches: 1, courses: 1, jobPosts: 1 };
    } else if (role === "teacher") {
      updateData.batches = [];
      unsetData = { enrolledCourses: 1, jobPosts: 1, courses: 1 };
    } else if (role === "admin") {
      updateData.courses = [];
      unsetData = { enrolledCourses: 1, batches: 1, jobPosts: 1 };
    } else if (role === "company") {
      updateData.jobPosts = [];
      unsetData = { enrolledCourses: 1, batches: 1, courses: 1 };
    } else {
      throw new Error("Invalid role");
    }
    let updateField: any = { $set: updateData, $unset: unsetData }
    return await this.userDao.updateRole(userId, updateField)
  }
}
