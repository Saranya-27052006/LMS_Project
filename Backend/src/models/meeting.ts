import { Schema,model,Types,Document } from "mongoose";

export interface IMeeting extends Document{
    batchId:Types.ObjectId;
    teacherId:Types.ObjectId;
    title:string;
    description:string;
    meetingLink:string;
    date:string;
    time:string;
}

const MeetingSchema = new Schema<IMeeting>(
    {
        batchId:{type:Schema.Types.ObjectId,ref:"Batch"},
        teacherId:{type:Schema.Types.ObjectId,ref:"User"},
        title:{type:String,required:true},
        description:{type:String},
        meetingLink:{type:String,required:true},
        date:{type:String,required:true},
        time:{type:String,required:true}

    },
    {timestamps:true}
    
)

export default model<IMeeting>("Meeting",MeetingSchema);