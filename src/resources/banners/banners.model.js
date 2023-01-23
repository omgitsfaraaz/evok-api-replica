import mongoose from "mongoose";

const bannersSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Banners = mongoose.model("banners", bannersSchema);
