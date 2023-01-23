import { Router } from "express";
import { homePage } from "./home.controller.js";

const homeRouter = Router();

homeRouter.route("/").post(homePage);

export default homeRouter;
