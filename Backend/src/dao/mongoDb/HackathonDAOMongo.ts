import { Types } from "mongoose";
import Hackathon, { type IHackathon } from "../../models/Hackathon";
import type { IHackathonDAO } from "../interfaces/IHackathonDAO";

export default class HackathonDAO implements IHackathonDAO {
  async createHackathon(data: IHackathon): Promise<IHackathon> {
    const hackathon = new Hackathon(data);
    return await hackathon.save();
  }

  async getHackathonById(id: string): Promise<IHackathon | null> {
    return await Hackathon.findById(id).populate("batchId createdBy");
  }

  async getHackathonByBatch(batchId: string): Promise<IHackathon[]> {
    return await Hackathon.find({ batchId: new Types.ObjectId(batchId) });
  }

  async getAllHackathon(): Promise<IHackathon[]> {
    return await Hackathon.find()
  }

  async updateHackathon(id: string, data: Partial<IHackathon>): Promise<IHackathon | null> {
    return await Hackathon.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteHackathon(id: string): Promise<IHackathon | null> {
    return await Hackathon.findByIdAndDelete(id);
  }
}
