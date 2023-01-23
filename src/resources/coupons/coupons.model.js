import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  coupon: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  displayInHome: {
    type: Boolean,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

export const Coupons = mongoose.model("coupons", couponSchema);
