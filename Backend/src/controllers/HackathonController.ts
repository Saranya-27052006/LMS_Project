import type { Request, Response, NextFunction } from "express";
import { HackathonService } from "../services/HackathonService";

export class HackathonController {
  private hackathonService: HackathonService;

  constructor(hackathonService: HackathonService) {
    this.hackathonService = hackathonService;
  }

  createHackathon = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user || !user.id || !user.role) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      

      const hackathon = await this.hackathonService.createHackathon(
        { id: user.id, role: user.role },
        req.body
      );
      res.status(201).json(hackathon);
    } catch (err) {
      next(err);
    }
  };

  updateHackathon = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user || !user.id || !user.role) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const hackathon = await this.hackathonService.updateHackathon(
        { id: user.id, role: user.role },
        req.params.id,
        req.body
      );
      res.status(200).json(hackathon);
    } catch (err) {
      next(err);
    }
  };

  deleteHackathon = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user || !user.id || !user.role) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const hackathon = await this.hackathonService.deleteHackathon(
        { id: user.id, role: user.role },
        req.params.id
      );
      res.status(200).json(hackathon);
    } catch (err) {
      next(err);
    }
  };

  getHackathons = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user || !user.id || !user.role) return res.status(401).json({ message: "Unauthorized" });

      const hackathons = await this.hackathonService.getHackathonsByUserRole({id:user.id,role:user.role});
      res.status(200).json(hackathons);
    } catch (err) {
      next(err);
    }
  };

  getHackathonById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hackathon = await this.hackathonService.getHackathonById(req.params.id);
      res.json(hackathon);
    } catch (err) {
      next(err);
    }
  };

  
}
