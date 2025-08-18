import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ServiceManager } from "../services/ServiceManager";

export function createUserRouter() {
  const router = Router();
  const userController = new UserController(ServiceManager.userService);

  router.post("/users", userController.createUser);
  router.get("/", userController.getAllUsers);

  return router;
}
