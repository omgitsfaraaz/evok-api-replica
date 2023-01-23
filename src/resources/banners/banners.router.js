import { Router } from "express";
import { addBanner } from "./banners.controller.js";

const bannerRouter = Router();

bannerRouter.route("/").post(addBanner);

export default bannerRouter;
