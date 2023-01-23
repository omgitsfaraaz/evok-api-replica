import { Router } from "express";
import { addCoupon } from "./coupons.controller.js";

const couponsRouter = Router();

couponsRouter.route("/add").post(addCoupon);

export default couponsRouter;
