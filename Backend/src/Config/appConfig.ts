import dotenv from "dotenv"
dotenv.config();

export const appConfig = {
    MongoDbUri: process.env.MONGODB_URI as string,
    Port: process.env.PORT,
}