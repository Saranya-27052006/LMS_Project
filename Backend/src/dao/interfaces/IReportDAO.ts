
import type { IReport } from "../../models/report";
import type { IToken } from "../../types/token";
import { Types } from "mongoose";

export interface IReportDAO {
  createReport(
    user:IToken,
    
    batchId: Types.ObjectId,
    
    reportData: Partial<IReport>
  ): Promise<IReport>;

  updateReport(
    user: IToken,
    reportId: Types.ObjectId,
    studentId: Types.ObjectId,
    updateData: Partial<IReport["students"][number]>
  ): Promise<IReport | null>;

  getAllReports(user: IToken): Promise<IReport[]>;

  getBatchReports(user: IToken,batchId:Types.ObjectId): Promise<IReport[]>;

  getStudentReport(user: IToken): Promise<IReport | null>;

  getSpecificStudentReport(
    user: IToken,
    studentId: Types.ObjectId
  ): Promise<IReport | null>;

  deleteReport(user: IToken, reportId: Types.ObjectId): Promise<boolean>;
}
