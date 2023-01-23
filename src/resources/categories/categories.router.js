import { Router } from "express";
import {
  addCategory,
  getAllCatgories,
  getPlp,
} from "./categories.controller.js";

const categoryRouter = Router();

categoryRouter.route("/").get(getAllCatgories).post(addCategory);
categoryRouter.route("/:id").get(getPlp);

export default categoryRouter;
