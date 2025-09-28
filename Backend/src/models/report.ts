
import {Schema,Types,model,Document} from "mongoose"

export interface IReport extends Document{
    batchId:Types.ObjectId;
    createdBy:Types.ObjectId;
    students:{
        studentId:Types.ObjectId;
        problemsAttempted?:number;
        problemsPassed?:number;
        problemsFailed?:number;
        problemsCompleted?:number;
        videoLink?:string;
        githubLink?:string;
        grade?:number;
    }[];
    createdAt:Date;
} 

const reportSchema = new Schema({
    batchId:{type:Schema.Types.ObjectId,ref:"Batch",required:true},
    createdBy:{type:Schema.Types.ObjectId,ref:"User",required:true},
    students:[
        {
            studentId:{type:Schema.Types.ObjectId,ref:"User",required:true},
            problemsAttempted:{type:Number,default:0},
            problemsPassed:{type:Number,default:0},
            problemsFailed:{type:Number,default:0},
            problemsCompleted:{type:Number,default:0},
            videoLink:{type:String,default:""},
            githubLink:{type:String,default:""},
            grade:{type:Number,default:null}

        }
    ],
    createdAt:{type:Date,default:Date.now}
})
export default model<IReport>("Report",reportSchema);