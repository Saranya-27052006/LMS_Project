import type { IHackathon } from "../../models/Hackathon";

export interface IHackathonDAO {
  createHackathon(hackathon: IHackathon): Promise<IHackathon>;
  getHackathonById(id: string): Promise<IHackathon | null>;
  getHackathonByBatch(batchId: string): Promise<IHackathon[]>;
  getAllHackathon(): Promise<IHackathon[]>;
  updateHackathon(id: string, data: Partial<IHackathon>): Promise<IHackathon | null>;
  deleteHackathon(id: string): Promise<IHackathon | null>
}
