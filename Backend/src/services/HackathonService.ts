import HackathonDAO from "../dao/mongoDb/HackathonDAOMongo";
import type { IHackathon } from "../models/Hackathon";

export class HackathonService {
  private hackathonDAO: HackathonDAO;

  constructor(hackathonDAO: HackathonDAO) {
    this.hackathonDAO = hackathonDAO;
  }

  async createHackathon(data: IHackathon) {
    return await this.hackathonDAO.createHackathon(data);
  }

  async getHackathonById(id: string) {
    return await this.hackathonDAO.getHackathonById(id);
  }

  async getAllHackathon() {
    return await this.hackathonDAO.getAllHackathon();
  }

  async getHackathonByBatch(batchId: string) {
    return await this.hackathonDAO.getHackathonByBatch(batchId);
  }

  async updateHackathon(id: string, data: Partial<IHackathon>) {
    return await this.hackathonDAO.updateHackathon(id, data);
  }

  async deleteHackathon(id: string) {
    return await this.hackathonDAO.deleteHackathon(id)
  }
}
