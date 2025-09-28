
import type {IMeeting} from "../../models/meeting"

export interface IMeetingDAO {

    findAllMeetings():Promise<IMeeting[]>;
    findMeetingsByTeacherIdsOrAdmins(teacherId:string,adminIds:string[]):Promise<IMeeting[]>;
    findMeetingsByBatchIds(batchIds:string[]):Promise<IMeeting[]>
    updateMeetingById(id:string,updateData:Partial<IMeeting>):Promise<IMeeting | null>
    createMeeting(meetingData:Partial<IMeeting>):Promise<IMeeting>;
    deleteMeeting(id:string):Promise<IMeeting | null>;
};