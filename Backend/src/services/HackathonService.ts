import Batch from "../models/Batch";
import User from "../models/user";
import Hackathon from "../models/Hackathon";
import  type { IHackathon } from "../models/Hackathon";

import HackathonDAO from "../dao/mongoDb/HackathonDAOMongo";
import mongoose from "mongoose";

export class HackathonService {
  private hackathonDAO: HackathonDAO;

  constructor(hackathonDAO: HackathonDAO) {
    this.hackathonDAO = hackathonDAO;
  }

  async createHackathon(user: { id: string; role: string }, data: Partial<IHackathon>) {
    if (user.role === "student") {
      throw new Error("Students cannot create hackathons");
    }

    if (user.role === "teacher") {
      if (!data.batchId) throw new Error("BatchId is required for hackathon");

      const batch = await Batch.findOne({ _id: data.batchId, teachers: user.id });
      if (!batch) throw new Error("Teacher not allowed to create hackathon for this batch");
    }

    data.createdBy = new mongoose.Types.ObjectId(user.id);
    return await this.hackathonDAO.createHackathon(data as IHackathon);
  }

  async updateHackathon(user: { id: string; role: string }, id: string, updateData: Partial<IHackathon>) {
    const hackathon = await Hackathon.findById(id);
    if (!hackathon) throw new Error("Hackathon not found");

    if (user.role === "student") throw new Error("Students cannot update hackathons");
    if (user.role === "teacher" && hackathon.createdBy?.toString() !== user.id) {
      throw new Error("Teacher not allowed to update this hackathon");
    }

    return await this.hackathonDAO.updateHackathon(id, updateData);
  }

  async deleteHackathon(user: { id: string; role: string }, id: string) {
    const hackathon = await Hackathon.findById(id);
    if (!hackathon) throw new Error("Hackathon not found");

    if (user.role === "student") throw new Error("Students cannot delete hackathons");
    if (user.role === "teacher" && hackathon.createdBy?.toString() !== user.id) {
      throw new Error("Teacher not allowed to delete this hackathon");
    }

    return await this.hackathonDAO.deleteHackathon(id);
  }

  async getHackathonsByUserRole(user: { id: string; role: string }) {
    if (user.role === "admin") {
      return await this.hackathonDAO.getAllHackathon();
    }

    if (user.role === "teacher") {
  // Get batches where this teacher is assigned
  const batches = await Batch.find({ teachers: user.id }).select("_id");
  const batchIds = batches.map(b => b._id);

  // Fetch hackathons either created by the teacher OR created by admin for their batches
  return await Hackathon.find({
    $or: [
      { createdBy: user.id }, // teacher-created
      { batchId: { $in: batchIds } } // admin-created for their batches
    ]
  });
}

    if (user.role === "student") {
      const batches = await Batch.find({ students: user.id }).select("_id");
      const batchIds = batches.map(b => (b._id as mongoose.Types.ObjectId).toString());
      return await this.hackathonDAO.getHackathonByBatch(batchIds[0]); // student sees batch hackathons
    }

    return [];
  }
  async getHackathonById(id: string) {
  const hackathon = await this.hackathonDAO.getHackathonById(id);
  if (!hackathon) {
    throw new Error("Hackathon not found");
  }
  return hackathon;
}

  


  }

