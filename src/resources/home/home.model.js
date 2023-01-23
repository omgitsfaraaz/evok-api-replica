import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    required: true,
  },
});

export const Home = mongoose.model("home", homeSchema);
