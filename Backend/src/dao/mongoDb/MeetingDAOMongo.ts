import type { IMeetingDAO } from "../interfaces/IMeetingDAO";
import Meeting from "../../models/meeting";
import type { IMeeting } from "../../models/meeting"

export default class meetingDAOMongo implements IMeetingDAO{
    async findAllMeetings(): Promise<IMeeting[]> {
        return Meeting.find({});

    }

    async findMeetingsByTeacherIdsOrAdmins(teacherId:string,adminIds:string[]):Promise<IMeeting[]>{
        return Meeting.find({
            $or:[{teacherId},{teacherId:{$in:adminIds}}],
        })
    }
    async findMeetingsByBatchIds(batchIds: string[]): Promise<IMeeting[]> {
        return Meeting.find({batchId:{$in:batchIds}})   
    }
    async updateMeetingById(id: string, updateData: Partial<IMeeting>): Promise<IMeeting | null> {
        return Meeting.findByIdAndUpdate(id,updateData,{new:true})
        
    }

    async createMeeting(meetingData: Partial<IMeeting>): Promise<IMeeting> {
        return Meeting.create(meetingData);
    }

    async deleteMeeting(id: string): Promise<IMeeting | null> {
        return Meeting.findByIdAndDelete(id)
    }
}
