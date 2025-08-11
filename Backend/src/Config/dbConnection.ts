import mongoose from "mongoose";
import { appConfig } from "./appConfig"

export const dbConnection = async () => {
  try {
    console.log(appConfig.MongoDbUri);
    await mongoose.connect(appConfig.MongoDbUri);
  } catch (error: any) {
    console.error("MongoDB Connection Error:", error.message);
    // Retry connection after 5 seconds
    setTimeout(dbConnection, 5000);
  }
};
