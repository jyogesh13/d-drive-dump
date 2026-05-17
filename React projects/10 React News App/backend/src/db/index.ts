import mongoose from "mongoose";
import { env } from "../config/env.js";
import { DB_NAME } from "../constants.js";

export const connectDB = async (): Promise<void> => {
    try {
        const connectionInstance = await mongoose.connect(`${env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Database connected:\nHost name: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error(`Database connection failed: ${error}`)
        process.exit(1)
    }
}
