import { Router } from "express";
import {
  addOrRemoveFromWishlist,
  getWishlistProducts,
} from "./wishlist.conttroller.js";

const wishlistRouter = Router();

wishlistRouter.route("/add").post(addOrRemoveFromWishlist);

wishlistRouter.route("/getitems/:customerId").get(getWishlistProducts);

export default wishlistRouter;
