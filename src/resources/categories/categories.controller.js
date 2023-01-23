import { resBuilder } from "../../utils/resBuilder.js";
import { Products } from "../products/product.model.js";
import { Category } from "./categories.model.js";

export const getAllCatgories = (req, res) => {
  Category.find()
    .then((allCategories) => {
      res.status(200).json(resBuilder(true, allCategories, null));
    })
    .catch((err) => {
      res.status(400).json(resBuilder(false, null, err));
    });
  // res.end();
};

export const addCategory = async (req, res) => {
  if (!req.body.categoryName || !req.body.image) {
    res.status(400).json({ message: "Category name or image required" });
  }
  await Category.create(req.body)
    .then((createdCategory) =>
      res.status(201).json(resBuilder(true, createdCategory, null))
    )
    .catch((err) => res.status(400).json(resBuilder(false, null, err)));
};

export const getPlp = async (req, res) => {
  await Products.find()
    .where("category")
    .equals(req.params.id)
    .then((products) => res.status(200).json(products))
    .catch((err) => resBuilder(false, null, err));
};
