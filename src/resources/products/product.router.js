import { Router } from "express";
import {
  addProduct,
  editProduct,
  getProductById,
} from "./product.controller.js";

const productRouter = Router();

productRouter.route("/").post(addProduct);
productRouter.route("/:id").patch(editProduct).get(getProductById);

export default productRouter;
