import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productImg: {
    type: String,
    required: true,
    unique: true,
  },
  allImages: {
    type: Array,
  },
  discount: {
    type: String,
  },
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  mrp: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  vid: {
    type: Array,
  },
  stock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  warranty: {
    type: String,
    required: true,
  },
  customerRedressal: {
    type: String,
    required: true,
  },
  returnExchange: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories" }],
});

export const Products = mongoose.model("products", productSchema);
