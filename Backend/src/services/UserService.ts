import type { IUser } from "../models/user";
import type { IUserDAO } from "../dao/interfaces/IUserDAO";
import bcrypt from "bcrypt";
import AuthService from "./AuthService";
import { verifyAuth } from "../utils/OuthVerify";
import { AppError } from "../utils/AppError";

export class UserService {
  private userDao: IUserDAO;

  constructor(userDao: IUserDAO) {
    this.userDao = userDao;
  }

  async createUser(userData: IUser) {
    const isExist = await this.userDao.findByEmail(userData.email);
    if (isExist) {
      throw new AppError("User already exists", 400);
    }
    if (!userData.password) {
      throw new AppError("Password is required", 400);
    }
    const hashed = await bcrypt.hash(userData.password, 10);
    const user = await this.userDao.createUser({ ...userData, password: hashed });
    const token = AuthService.generateToken(user);
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await this.userDao.findByEmail(email);
    if (!user) {
      throw new AppError("User does not exist", 404);
    }
    if (!password || !user.password) {
      throw new AppError("Password is missing", 400);
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new AppError("Invalid password", 401);
    }
    const token = AuthService.generateToken(user);
    return { token, user };
  }

  async googleLogin(idToken: string) {
    const payload = await verifyAuth(idToken);
    if (!payload) {
      throw new AppError("Google ID verification failed", 400);
    }
    const { sub: googleId, email, name, picture } = payload;
    if (!email) {
      throw new AppError("Email is required from Google payload", 400);
    }

    let user = await this.userDao.findByEmail(email);
    if (!user) {
      user = await this.userDao.createUser({
        googleId,
        email,
        name: name || "Google User",
        picture: picture?.replace(/"$/, "") || "",
        notification: [],
      });
    } else {
      user = await this.userDao.updateGoogleFields(
        email,
        googleId,
        picture?.replace(/"$/, "")
      );
    }
    const token = AuthService.generateToken(user);
    return { token, user };
  }

  async getAllUsers() {
    return await this.userDao.findAll();
  }

  async getUserById(userId: string) {
    const user = await this.userDao.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async changeUserRole(userId: string, role: string) {
    const validRoles = ["student", "teacher", "admin", "company"];
    if (!validRoles.includes(role)) {
      throw new AppError("Invalid role", 400);
    }

    let updateData: any = { role };
    let unsetData: any = {};

    switch (role) {
      case "student":
        updateData.enrolledCourses = [];
        unsetData = { batches: 1, courses: 1, jobPosts: 1 };
        break;
      case "teacher":
        updateData.batches = [];
        unsetData = { enrolledCourses: 1, jobPosts: 1, courses: 1 };
        break;
      case "admin":
        updateData.courses = [];
        unsetData = { enrolledCourses: 1, batches: 1, jobPosts: 1 };
        break;
      case "company":
        updateData.jobPosts = [];
        unsetData = { enrolledCourses: 1, batches: 1, courses: 1 };
        break;
    }

    const updateField = { $set: updateData, $unset: unsetData };
    return await this.userDao.updateRole(userId, updateField);
  }
}
