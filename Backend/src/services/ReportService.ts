// services/reportService.ts
import { Types } from "mongoose";
import ReportDAO from "../dao/mongoDb/ReportDAOMongo";
import type { IReport } from "../models/report";
import type { IToken } from "../types/token";

export  class ReportService {
  private reportDAO: ReportDAO;

  constructor(reportDAO: ReportDAO) {
    this.reportDAO = reportDAO;
  }

  async createReport(user: IToken, batchId: Types.ObjectId, reportData: Partial<IReport>) {
    if (user.role !== "teacher" && user.role !== "admin") {
      throw new Error("Only teachers or admins can create reports");
    }
    return this.reportDAO.createReport(user,batchId, reportData);
  }

  async updateReport(
  user: IToken,
  reportId: Types.ObjectId,
  studentSubId: Types.ObjectId,
  updateData: Partial<IReport["students"][number]>
) {
  if (user.role === "student" && user.id.toString() !== studentSubId.toString()) {
    throw new Error("Students can only update their own report");
  }

  if (user.role === "student") {
    
    const { grade, ...allowedUpdates } = updateData;
    updateData = allowedUpdates;
  }

  
  return this.reportDAO.updateReport(user, reportId, studentSubId, updateData);
}


  async getReports(user: IToken, batchId?: Types.ObjectId, studentId?: Types.ObjectId) {
    if (user.role === "admin") {
      if (!batchId) return this.reportDAO.getAllReports(user);
      return []; 
    }

    if (user.role === "teacher") {
      if (!batchId) throw new Error("Batch ID required for teacher reports");
      return this.reportDAO.getBatchReports(user,batchId);
    }

    if (user.role === "student") {
      return this.reportDAO.getStudentReport(user.id as any);
    }

    throw new Error("Unauthorized role");
  }

  async deleteReport(user: IToken, reportId: Types.ObjectId): Promise<boolean> {
  if (user.role !== "teacher" && user.role !== "admin") {
    throw new Error("Only teachers or admins can delete reports");
  }

  
  // const report = await this.reportDAO.getReportById(reportId);
  // if (user.role === "teacher" && report && report.batchId.toString() !== user.batchId.toString()) {
  //   throw new Error("Teachers can only delete reports from their batches");
  // }

  return this.reportDAO.deleteReport(user, reportId)
}

}
