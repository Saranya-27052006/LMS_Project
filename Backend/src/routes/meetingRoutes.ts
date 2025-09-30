import { Router } from "express";
import { MeetingController } from "../controllers/MeetingController";
import { authenticate} from "../middleware/AuthMiddleware";
import { ServiceManager } from "../services/ServiceManager";

export function createMeetingRouter() {
  const router = Router();
  const meetingController = new MeetingController(ServiceManager.meetingService); 

  
  router.post("/meetings",authenticate,  meetingController.createMeeting);
  router.put("/meetings/update/:id",authenticate,   meetingController.updateMeeting);
  router.delete("/meetings/del/:id",authenticate,   meetingController.deleteMeeting);
  router.get("/meetings/get",authenticate, meetingController.getMeetings);

  return router;
}
