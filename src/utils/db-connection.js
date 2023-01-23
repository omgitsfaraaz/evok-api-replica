import mongoose from "mongoose";
import * as dotenv from "dotenv"; // Env Variables
dotenv.config();

export const connection = () => {
  return mongoose.connect(process.env.MONGODB_URI);
};
