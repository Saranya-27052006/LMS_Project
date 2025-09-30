import Batch from "../models/Batch";
import User from "../models/user";
import Meeting from "../models/meeting";
import type { IMeetingDAO } from "../dao/interfaces/IMeetingDAO";
import type { IMeeting } from "../models/meeting";
import mongoose from "mongoose";

export class MeetingService {
    private meetingDAO: IMeetingDAO;

    constructor(meetingDAO: IMeetingDAO) {
        this.meetingDAO = meetingDAO;
    }

    async createMeeting(user: { id: string; role: string }, meetingData: Partial<IMeeting>): Promise<IMeeting> {
        if (user.role === "student") {
            throw new Error("Students cannot create meetings");
        }

        if (user.role === "teacher") {
            if (!meetingData.batchId) throw new Error("BatchId is required for meeting");

            const batch = await Batch.findOne({ _id: meetingData.batchId, teachers: user.id });
            if (!batch) throw new Error("Teacher not allowed to create meeting for this batch");
        }

        meetingData.teacherId = new mongoose.Types.ObjectId(user.id);
        return await this.meetingDAO.createMeeting(meetingData);
    }

    async updateMeeting(user: { id: string; role: string }, id: string, updateData: Partial<IMeeting>): Promise<IMeeting> {
        const meeting = await Meeting.findById(id);
        if (!meeting) throw new Error("Meeting not found");

        if (user.role === "student") throw new Error("Students cannot update meetings");
        if (user.role === "teacher" && meeting.teacherId.toString() !== user.id) {
            throw new Error("Teacher not allowed to update this meeting");
        }

        const updatedMeeting = await this.meetingDAO.updateMeetingById(id, updateData);
        if (!updatedMeeting) throw new Error("Meeting not found after update");

        return updatedMeeting;
    }

    async deleteMeeting(user: { id: string; role: string }, id: string): Promise<IMeeting> {
        const meeting = await Meeting.findById(id);
        if (!meeting) throw new Error("Meeting not found");

        if (user.role === "student") throw new Error("Students cannot delete meetings");
        if (user.role === "teacher" && meeting.teacherId.toString() !== user.id) {
            throw new Error("Teacher not allowed to delete this meeting");
        }

        const deletedMeeting = await this.meetingDAO.deleteMeeting(id);
        if (!deletedMeeting) throw new Error("Meeting not found after delete");

        return deletedMeeting;
    }

    async getMeetingsByUserRole(user: { id: string; role: string }): Promise<IMeeting[]> {
        if (user.role === "admin") {
            return await this.meetingDAO.findAllMeetings();
        }

        if (user.role === "teacher") {
            const admins = await User.find({ role: "admin" }).select("_id");
            const adminIds = admins.map(a => a._id.toString());
            return this.meetingDAO.findMeetingsByTeacherIdsOrAdmins(user.id, adminIds);
        }

        if (user.role === "student") {
            const batchIds = await this.getStudentBatchIds(user.id);
            return this.meetingDAO.findMeetingsByBatchIds(batchIds);
        }

        return [];
    }

    private async getStudentBatchIds(studentId: string): Promise<string[]> {
        const batches = await Batch.find({ students: studentId }).select("_id");
        return batches.map(b => (b._id as mongoose.Types.ObjectId).toString());

    }
}
