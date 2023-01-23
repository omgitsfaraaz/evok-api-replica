import { resBuilder } from "../../utils/resBuilder.js";
import { Banners } from "./banners.model.js";

export const addBanner = (req, res) => {
  if (!req.body.imgUrl) {
    res.status(400).json(resBuilder(false, null, "Image url not found"));
  }
  Banners.create(req.body)
    .then((createdBanner) =>
      res.status(201).json(resBuilder(true, createdBanner, null))
    )
    .catch((err) => res.status(400).json(resBuilder(false, null, err)));
};

export const getBanners = async (req, res) => {
  const banners = Banners.find()
    .then((allBanners) => {
      return allBanners;
    })
    .catch((err) => {
      return err;
    });
  if (!banners) {
    res.status(400).json(false, null, "Banners not found");
  }
  return banners;
};
