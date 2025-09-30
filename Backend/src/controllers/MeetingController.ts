import type { Request, Response, NextFunction } from "express";
import { MeetingService } from "../services/MeetingService";

export class MeetingController {
    private meetingService: MeetingService;

    constructor(meetingService: MeetingService) {
        this.meetingService = meetingService;
    }

    createMeeting = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            if (!user || !user.id || !user.role) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const meeting = await this.meetingService.createMeeting(
                { id: user.id, role: user.role },
                req.body
            );
            res.status(201).json(meeting);
        } catch (err) {
            next(err);
        }
    };

    updateMeeting = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            if (!user || !user.id || !user.role) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const { id } = req.params;
            const updatedMeeting = await this.meetingService.updateMeeting(
                { id: user.id, role: user.role },
                id,
                req.body
            );
            res.status(200).json(updatedMeeting);
        } catch (err) {
            next(err);
        }
    };

    deleteMeeting = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            if (!user || !user.id || !user.role) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "meetingId is required" });
            }

            const deletedMeeting = await this.meetingService.deleteMeeting(
                { id: user.id, role: user.role },
                id
            );
            res.status(200).json(deletedMeeting);
        } catch (err) {
            next(err);
        }
    };

    getMeetings = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            if (!user || !user.id || !user.role) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const meetings = await this.meetingService.getMeetingsByUserRole({
                id: user.id,
                role: user.role,
            });
            res.status(200).json(meetings);
        } catch (err) {
            next(err);
        }
    };
}
