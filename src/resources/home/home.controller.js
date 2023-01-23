import { resBuilder } from "../../utils/resBuilder.js";
import { Banners } from "../banners/banners.model.js";
import { Category } from "../categories/categories.model.js";
import { Products } from "../products/product.model.js";
import { Coupons } from "../coupons/coupons.model.js";

export const homePage = async (req, res) => {
  // const sort = [
  //   "banners",
  //   "Best Seller",
  //   "Shop By",
  //   "Top Trending",
  //   "New Arrival",
  // ];
  if (!req.body.sortBy) {
    res.status(400).json({ message: "Sorting order is required" });
  }
  const shopBy = await Category.find()
    .then((categories) => {
      return categories;
    })
    .catch((err) => {
      res.status(400).json(resBuilder(false, null, err));
    });
  const banners = await Banners.find()
    .then((allBanners) => {
      return allBanners;
    })
    .catch((err) => {
      res.status(400).json(resBuilder(false, null, err));
    });
  const bestSelling = await Products.find()
    .where("productType")
    .equals("bestseller");

  const newArrival = await Products.find()
    .where("productType")
    .equals("newarrival");

  const topTrending = await Products.find()
    .where("productType")
    .equals("toptrending");

  const coupons = await Coupons.find()
    .where("displayInHome")
    .equals(true)
    .then((homeCoupon) => {
      return homeCoupon;
    })
    .catch((err) => res.status(400).json(false, null, err));

  const myHome = req.body.sortBy.map((ele) => {
    return {
      title: ele,
      data:
        ele == "banners"
          ? banners
          : ele == "Best Seller"
          ? bestSelling
          : ele == "Shop By"
          ? shopBy
          : ele == "Top Trending"
          ? topTrending
          : newArrival,
    };
  });
  // res.status(200).json([
  //   {
  //     title: "banners",
  //     data: banners,
  //   },
  //   {
  //     title: "Shop By",
  //     data: shopBy,
  //   },
  //   {
  //     title: "Best Seller",
  //     data: bestSelling,
  //   },
  //   {
  //     title: "New Arrival",
  //     data: newArrival,
  //   },
  //   {
  //     title: "Top Trending",
  //     data: topTrending,
  //   },
  // ]);
  res.status(200).json({
    coupons,
    homepageData: myHome,
  });
};
