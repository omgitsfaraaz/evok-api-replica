import { Coupons } from "./coupons.model.js";
import { resBuilder } from "../../utils/resBuilder.js";

export const getCoupon = async (req, res) => {};

export const addCoupon = async (req, res) => {
  const couponParams = ["coupon", "desc", "color"];
  couponParams.map((e) => {
    if (!req.body[e]) {
      res.status(400).json({ message: `${e} is required` });
    }
  });
  await Coupons.create(req.body)
    .then((createdCoupon) =>
      res.status(201).json(resBuilder(true, createdCoupon, null))
    )
    .catch((err) => res.status(400).json(resBuilder(false, null, err)));
};
