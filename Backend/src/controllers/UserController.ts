import type { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  createUser = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err)
    }
  };
  
  userLogin = async(req:Request,res:Response,next:NextFunction) =>{
    try{
      const {email,password} = req.body
      const user = await this.userService.login(email,password);
      res.status(201).json(user);
    }catch(err:any){
      next(err)
    }
  }

  GoogleUserLogin = async(req:Request,res:Response,next:NextFunction) =>{
    try{
      const user = await this.userService.googleLogin(req.body);
      res.status(201).json(user);
    }catch(err:any){
      next(err);
    }
  }

  getAllUsers = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (err:any) {
      next(err);
    }
  };

  getUserById = async(req:Request,res:Response,next:NextFunction) => {
    try{
      const userId:string = req.params.id
      const user = await this.userService.getUserById(userId)
      res.json(user)
    }catch(err:any){
      next(err);
    }
  }

  updateUserRole = async(req:Request,res:Response, next: NextFunction) => {
    try{
       const {userId,role} = req.body;    
       const updatedUser = await this.userService.changeUserRole(userId,role);
       res.json(updatedUser);
    }catch(err:any){
      next(err);
    }
  }
}
