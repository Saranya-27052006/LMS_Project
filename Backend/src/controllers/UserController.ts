import type { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err: unknown) {
      if (err instanceof Error) return next(err);
      next(new Error("Something went wrong"));
    }
  };

  userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.login(email, password);
      res.status(200).json(user);
    } catch (err: unknown) {
      if (err instanceof Error) return next(err);
      next(new Error("Something went wrong"));
    }
  };

  GoogleUserLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idToken } = req.body;
      if (!idToken) return res.status(400).json({ error: "Missing idToken" });

      const user = await this.userService.googleLogin(idToken);
      res.status(200).json(user);
    } catch (err: unknown) {
      if (err instanceof Error) return next(err);
      next(new Error("Something went wrong"));
    }
  };

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (err: unknown) {
      if (err instanceof Error) return next(err);
      next(new Error("Something went wrong"));
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);
      res.json(user);
    } catch (err: unknown) {
      if (err instanceof Error) return next(err);
      next(new Error("Something went wrong"));
    }
  };

  updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, role } = req.body;
      const updatedUser = await this.userService.changeUserRole(userId, role);
      res.json(updatedUser);
    } catch (err: unknown) {
      if (err instanceof Error) return next(err);
      next(new Error("Something went wrong"));
    }
  };
}
