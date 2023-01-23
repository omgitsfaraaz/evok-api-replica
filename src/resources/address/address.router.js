import { Router } from "express";
import { addAddress, getAllAddresess } from "./address.controller.js";

const addressRouter = Router();

addressRouter.route("/add").post(addAddress);

addressRouter.route("/:customerId").get(getAllAddresess);

export default addressRouter;
