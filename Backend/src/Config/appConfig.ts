import dotenv from "dotenv"
dotenv.config();

export const appConfig = {
    MongoDbUri: process.env.MONGODB_URI as string,
    Port: process.env.PORT,
    DBType: process.env.DB_TYPE,
    JwtSecret:process.env.JWT_SECRET,
    googleClientId:process.env.CLIENT_ID,
    googleClientSecertKey:process.env.CLIENT_SECERT_KEY
}