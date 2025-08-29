import mongoose, { Schema, Types, type ObjectId } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  picture?: string;
  role?: string;
  enrolledCourses?: ObjectId[];
  batches?: ObjectId[];
  courses?: ObjectId[];
  jobPosts?: ObjectId[];
  notification?: ObjectId[];
}

const userschema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  picture: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  role: {
    type: String,
    enum: ["student", "teacher", "admin", "company"],
    required: true,
    default: "student",
  },
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course", default: undefined }],
  batches: [{ type: Schema.Types.ObjectId, ref: "Batch", default: undefined }],
  courses: [{ type: Schema.Types.ObjectId, ref: "Course", default: undefined }],
  jobPosts: [{ type: Schema.Types.ObjectId, ref: "Job", default: undefined }],
  notification: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "notification", default: [] }] },
});

userschema.pre("save", function (next) {
  if (this.role === "student") {
    this.courses = undefined;
    this.batches = undefined;
    this.jobPosts = undefined;
  }
  if (this.role === "teacher") {
    this.jobPosts = undefined;
    this.courses = undefined;
  }
  if (this.role === "admin") {
    this.jobPosts = undefined;
    this.enrolledCourses = undefined;
    this.batches = undefined;
  }
  if (this.role === "company") {
    this.enrolledCourses = undefined;
    this.batches = undefined;
    this.courses = undefined;
  }
  next();
});

export default mongoose.model<IUser>("User", userschema);
