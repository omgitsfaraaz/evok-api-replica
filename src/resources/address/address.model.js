import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  country_id: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  default_shipping: {
    type: Boolean,
    required: true,
  },
  default_billing: {
    type: Boolean,
    required: true,
  },
});

export const Address = mongoose.model("address", addressSchema);
