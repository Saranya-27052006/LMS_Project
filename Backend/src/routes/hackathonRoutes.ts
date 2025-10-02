import { Router } from "express";
import { HackathonController } from "../controllers/HackathonController";
import { ServiceManager } from "../services/ServiceManager";
import { authenticate} from "../middleware/AuthMiddleware";


export function createHackathonRouter() {
  const router = Router();
  const hackathonController = new HackathonController(ServiceManager.hackathonService);

  router.post("/hackathons",authenticate,  hackathonController.createHackathon);
  router.get("/allhackathons", authenticate, hackathonController.getHackathons);
  router.get("/hackathons/:id",authenticate, hackathonController.getHackathonById);
  router.put("/hackathons/:id",authenticate,hackathonController.updateHackathon);
  router.delete("/hackathons/:id",authenticate, hackathonController.deleteHackathon);

  return router;
}
