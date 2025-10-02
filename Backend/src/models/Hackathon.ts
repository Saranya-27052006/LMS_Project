import { Schema, model, Types } from "mongoose";

export interface IHackathon extends Document {
  title: string;
  description: string;
  batchId: Types.ObjectId;
  startTime: string;
  endTime: string;
  createdBy?: Types.ObjectId;
  problemsURL: string;
}

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const HackathonSchema = new Schema<IHackathon>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    batchId: { type: Schema.Types.ObjectId, ref: "Batch"},
    startTime: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => timeRegex.test(v),
        message: (props: any) => `${props.value} is not valid time! Expected in HH:mm`,
      },
    },
    endTime: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => timeRegex.test(v),
        message: (props: any) => `${props.value} is not valid time! Expected time for format is HH:mm`,
      },
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    problemsURL: {
      type: String,
      required: true,
     validate: {
      validator: (v: string) =>
        /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9-_]+\/edit.*$/i.test(v),
      message:
        "problemsURL must be a valid Google Sheets URL (https://docs.google.com/spreadsheets/d/...)",
    },
    },
  },
  {
    timestamps: true,
  }
);

export default model<IHackathon>("Hackathon", HackathonSchema)
