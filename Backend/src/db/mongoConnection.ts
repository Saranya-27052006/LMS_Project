import mongoose from "mongoose";
import { appConfig } from "../config/appConfig"

export const mongoConnection = async () => {
  try {
    await mongoose.connect(appConfig.MongoDbUri);
    console.log("Connected to db successfully")
  } catch (error: any) {
    console.error("MongoDB Connection Error:", error.message);
    // Retry connection after 5 seconds
    setTimeout(mongoConnection, 5000);
  }
};
