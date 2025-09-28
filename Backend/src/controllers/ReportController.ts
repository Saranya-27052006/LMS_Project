// controllers/ReportController.ts
import type {Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../types/token";
import { Types } from "mongoose";
import {ReportService} from "../services/ReportService";

export class ReportController {
  private reportService: ReportService;

  constructor(reportService: ReportService) {
    this.reportService = reportService;
  }

  createReport = async (req:Request, res: Response, next: NextFunction) => {
    try {
      const { batchId, ...reportData } = req.body;
       const user = {
      id: "68d4d1b2881bbc66177c37d8", 
      role: "admin"               
    } as any;
     
      
      const report = await this.reportService.createReport(
        user,
        new Types.ObjectId(batchId),
        reportData
      );
      res.status(201).json(report);
    } catch (err) {
      next(err)
    }
  };

  updateReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { reportId, studentSubId } = req.params;
      const user = {
      id: "68d4daca2798f226dffa53b0", 
      role: "admin"               
    } as any;
     
      const updatedReport = await this.reportService.updateReport(
        user,
        new Types.ObjectId(reportId),
        new Types.ObjectId(studentSubId),
        req.body
      );
      res.status(200).json(updatedReport);
    } catch (err) {
      next(err);
    }
  };

 getReports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const user = {
      id: "68d4d1b2881bbc66177c37d8", 
      role: "admin"
    } as any;

    const { batchId, studentId } = req.query;

    
    const reports = await this.reportService.getReports(
      user,
      batchId && Types.ObjectId.isValid(batchId as string) 
        ? new Types.ObjectId(batchId as string) 
        : undefined,
      studentId && Types.ObjectId.isValid(studentId as string) 
        ? new Types.ObjectId(studentId as string) 
        : undefined
    );

    if (!reports) {
      return res.status(404).json({ message: "No reports found" });
    }

    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};


  deleteReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const user = {
      id: "68d4d1b2881bbc66177c37d8", 
      role: "admin"               
    } as any;

      
      const { reportId } = req.params;

      if (!Types.ObjectId.isValid(reportId)) {
        return res.status(400).json({ message: "Invalid reportId" });
      }

      const success = await this.reportService.deleteReport(
        user,
        new Types.ObjectId(reportId)
      );

      if (!success) {
        return res.status(404).json({ message: "Report not found" });
      }

      res.status(200).json({ message: "Report deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}
