import express from "express"; // Express
import cors from "cors"; // Cors
import bodyParser from "body-parser"; // Body Parser
import { connection } from "./src/utils/db-connection.js"; // Mongoose connection
import userRouter from "./src/resources/users/users.router.js";
import orderRouter from "./src/resources/orders/orders.router.js";
import { protect, protectAdmin } from "./src/utils/auth.js";
import categoryRouter from "./src/resources/categories/categories.router.js";
import homeRouter from "./src/resources/home/home.router.js";
import bannerRouter from "./src/resources/banners/banners.router.js";
import productRouter from "./src/resources/products/product.router.js";
import couponsRouter from "./src/resources/coupons/coupons.router.js";
import addressRouter from "./src/resources/address/address.router.js";
import wishlistRouter from "./src/resources/wishlist/wishlist.router.js";

// Instance
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/api", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/homepage", homeRouter);
app.use("/api/banners", bannerRouter);

// Authorized routes
app.use("/api/orders", protect, orderRouter);
app.use("/api/address", protect, addressRouter);
app.use("/api/wishlist", protect, wishlistRouter);
app.use("/api/product", protectAdmin, productRouter);
app.use("/api/coupons", protectAdmin, couponsRouter);

const startServer = () => {
  connection()
    .then(() => {
      console.log("Connected to Mongo DB");
      app.listen(process.env.PORT, () =>
        console.log(`Server has started on PORT ${process.env.PORT}`)
      );
    })
    .catch((err) => console.log("error while connecting", err));
};
startServer();
