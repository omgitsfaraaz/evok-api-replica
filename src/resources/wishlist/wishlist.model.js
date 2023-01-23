import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
});

export const Wishlist = mongoose.model("wishlist", wishlistSchema);
