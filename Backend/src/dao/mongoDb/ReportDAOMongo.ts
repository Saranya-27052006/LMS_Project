import { Types } from "mongoose";
import Report  from "../../models/report";
import type { IReport } from "../../models/report";

import type {IToken} from "../../types/token";
import type {IReportDAO} from "../interfaces/IReportDAO";

export default class ReportDAO implements IReportDAO {
  async createReport(
    user: IToken,
    batchId: Types.ObjectId,
    
    reportData: Partial<IReport>
  ): Promise<IReport> {
    return Report.create({ ...reportData, batchId, createdBy: user.id });
  }

  async updateReport(
    user: IToken,
    reportId: Types.ObjectId,
    studentSubId: Types.ObjectId,
    updateData: Partial<IReport["students"][number]>
  ): Promise<IReport | null> {
    return Report.findOneAndUpdate(
      { _id: reportId, "students._id": studentSubId },
      { $set: Object.fromEntries(Object.entries(updateData).map(([k, v]) => [`students.$.${k}`, v])) },
      { new: true }
    );
  }

  async getAllReports(user: IToken): Promise<IReport[]> {
    return Report.find().populate("batchId").populate("students.studentId");
  }

  async getBatchReports(user: IToken, batchId: Types.ObjectId): Promise<IReport[]> {
    return Report.find({ batchId }).populate("students.studentId");
  }

  async getStudentReport(user: IToken): Promise<IReport | null> {
    return Report.findOne({ "students.studentId": user.id }).populate("students.studentId");
  }

  async getSpecificStudentReport(user: IToken, studentId: Types.ObjectId): Promise<IReport | null> {
    return Report.findOne({ "students.studentId": studentId }).populate("students.studentId");
  }

  async deleteReport(user: IToken, reportId: Types.ObjectId): Promise<boolean> {
    const result = await Report.findByIdAndDelete(reportId)
    return !!result
  }
}
