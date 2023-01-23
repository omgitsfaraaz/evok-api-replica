import { Router } from "express";
import { getAllOrders } from "./orders.controller.js";

const orderRouter = Router();

orderRouter.route("/").get(getAllOrders);

export default orderRouter;
