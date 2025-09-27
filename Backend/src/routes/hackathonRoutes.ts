import { Router } from "express";
import { HackathonController } from "../controllers/HackathonController";
import { ServiceManager } from "../services/ServiceManager";
import { authenticate, isAdmin } from "../middleware/AuthMiddleware";

export function createHackathonRouter() {
  const router = Router();
  const hackathonController = new HackathonController(ServiceManager.hackathonService);

  router.post("/hackathons",   hackathonController.createHackathon);
  router.get("/allhackathons",  hackathonController.getAllHackathons);
  router.get("/hackathons/:id", hackathonController.getHackathonById);
  router.get("/hackathons/batch/:batchId", hackathonController.getHackathonByBatch);
  router.put("/hackathons/:id",   hackathonController.updateHackathon);
  router.delete("/hackathons/:id", hackathonController.deleteHackathon)

  return router
}
