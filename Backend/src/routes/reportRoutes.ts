import { Router } from "express";
import { ReportController } from "../controllers/ReportController";
import { ServiceManager } from "../services/ServiceManager";


export function createReportRouter() {
  const router = Router();
  const reportController = new ReportController(ServiceManager.reportService);

  router.post("/reports",  reportController.createReport);
  router.put("/reports/:reportId/:studentSubId", reportController.updateReport)
  router.get("/reports", reportController.getReports);
  router.delete("/reports/:reportId",  reportController.deleteReport);

  return router
}
