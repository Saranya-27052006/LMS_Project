import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ServiceManager } from "../services/ServiceManager";
import { authenticate, isAdmin } from "../middleware/AuthMiddleware";

export function createUserRouter() {
  const router = Router();
  const userController = new UserController(ServiceManager.userService);

  router.post("/users", userController.createUser);
  router.post("/login",userController.userLogin);
  router.post("/googleLogin",userController.GoogleUserLogin);
  router.get("/", userController.getAllUsers);
  router.get("/user/:id",userController.getUserById);
  router.put("/user/update", authenticate,isAdmin, userController.updateUserRole);
  
  return router;
}
