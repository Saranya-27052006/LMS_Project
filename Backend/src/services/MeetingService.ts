import type { IMeetingDAO } from "../dao/interfaces/IMeetingDAO"

import type { IMeeting } from "../models/meeting"
import User from "../models/user"


export  class MeetingService{
    private meetingDAO:IMeetingDAO
    constructor(meetingDAO:IMeetingDAO){
        this.meetingDAO = meetingDAO
    }

    async createMeeting (meetingData:Partial<IMeeting>):Promise<IMeeting>{
        return await this.meetingDAO.createMeeting(meetingData)
    }

    async updateMeeting(id:string,updateData:Partial<IMeeting>):Promise<IMeeting>{
       const updatedMeeting = await this.meetingDAO.updateMeetingById(id,updateData)
       if(!updatedMeeting){
        throw new Error("Meeting not found")
       }
       return updatedMeeting
    }

    async deleteMeeting(id:string):Promise<IMeeting>{
        const deletedMeeting = await this.meetingDAO.deleteMeeting(id)
        if(!deletedMeeting){
            throw new Error("Meeting not found")
        }
        return deletedMeeting;
    }

    async getAllMeetings(): Promise<IMeeting[]> {
    return this.meetingDAO.findAllMeetings();
}


    

    // private async getStudentBatchIds(studentId:string):Promise<string[]>{
    //     const batches = await Batch.find({students:studentId}).select("_id");
    //     return batches.map(b => b._id.toString());
    // }
}