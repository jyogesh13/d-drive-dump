import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `Db Connected!!\nHost name: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error connecting to database:\n", error);
  }
};

export { connectDB };
