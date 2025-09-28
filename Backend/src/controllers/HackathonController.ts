import type { Request, Response, NextFunction } from "express";
import { HackathonService } from "../services/HackathonService";

export class HackathonController {
  private hackathonService: HackathonService;

  constructor(hackathonService: HackathonService) {
    this.hackathonService = hackathonService;
  }

  createHackathon = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hackathon = await this.hackathonService.createHackathon(req.body);
      res.status(201).json(hackathon);
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

  getHackathonByBatch = async (req: Request, res: Response,  next: NextFunction) => {
    try {
      const hackathon = await this.hackathonService.getHackathonByBatch(req.params.batchId);
      res.json(hackathon);
    } catch (err) {
      next(err);
    }
  };

  getAllHackathons = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hackathons = await this.hackathonService.getAllHackathon();
      res.json(hackathons);
    } catch (err) {
      next(err);
    }
  }





  updateHackathon = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hackathon = await this.hackathonService.updateHackathon(req.params.id, req.body);
      res.json(hackathon);
    } catch (err) {
      next(err);
    }
  };

  deleteHackathon = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hackathon = await this.hackathonService.deleteHackathon(req.params.id);
      res.json(hackathon);
    } catch (err) {
      next(err)
    }
  }
}
