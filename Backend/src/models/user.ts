import mongoose, { Schema, type ObjectId } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  googleId?: string;
  role: string;
  enrolledCourses?: ObjectId[];
  batches?: ObjectId[];
  jobOpportunity?: ObjectId[];
  notification: ObjectId[];
}

const userschema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String, unique: true, sparse: true },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    required: true,
    default: "student",
  },
  enrolledCourses: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }], default: undefined },
  batches: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "batch" }], default: undefined },
  jobOpportunity: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "vacancy" }], default: undefined },
  notification: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "notification" }], default: [] },
});

// Pre-save hook to set empty arrays based on role
userschema.pre("save", function (next) {
  if (this.isNew) {
    if (this.role === "student") {
      this.enrolledCourses = [];
    } else if (this.role === "teacher") {
      this.batches = [];
    } else if (this.role === "admin") {
      this.jobOpportunity = [];
    }
  }
  next();
});

export default mongoose.model<IUser>("User", userschema);
