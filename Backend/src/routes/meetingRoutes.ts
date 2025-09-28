import { Router } from "express";
import { MeetingController } from "../controllers/MeetingController";
import { authenticate, isAdmin } from "../middleware/AuthMiddleware";
import { ServiceManager } from "../services/ServiceManager";

export function createMeetingRouter() {
  const router = Router();
  const meetingController = new MeetingController(ServiceManager.meetingService); 

  
  router.post("/meetings",  meetingController.createMeeting);
  router.put("/meetings/update/:id",   meetingController.updateMeeting);
  router.delete("/meetings/del/:id",   meetingController.deleteMeeting);
  router.get("/meetings/get", meetingController.getMeetings)

  return router
}
