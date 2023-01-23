import { Router } from "express";
import { generateAdminToken } from "../../utils/auth.js";
import { customerToken, register } from "./users.controller.js";

const userRouter = Router();

userRouter.route("/register").post(register);
userRouter.route("/customertoken").post(customerToken);
userRouter.route("/admintoken").post(generateAdminToken);

export default userRouter;
