import { Products } from "./product.model.js";
import short from "short-uuid";
import { resBuilder } from "../../utils/resBuilder.js";

export const addProduct = async (req, res) => {
  const requiredParams = [
    "productImg",
    "productName",
    "price",
    "stock",
    "description",
    "warranty",
    "customerRedressal",
    "returnExchange",
    "productType",
    "category",
  ];
  requiredParams.map((param) => {
    if (req.body[param] == null) {
      res.status(400).json({ message: `${param} field is required` });
    }
  });

  await Products.create({ ...req.body, sku: short.generate() })
    .then((createdProd) =>
      res.status(201).json(resBuilder(true, createdProd, null))
    )
    .catch((err) => res.status(400).json(resBuilder(false, null, err)));
};

export const editProduct = async (req, res) => {
  await Products.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedProduct) =>
      res.status(200).json(resBuilder(true, updatedProduct, null))
    )
    .catch((err) => res.status(400).json(resBuilder(false, null, err)));
};

export const getProductById = async (req, res) => {
  await Products.findById(req.params.id, (err, docs) => {
    if (err) {
      res.status(400).json(resBuilder(false, null, err));
    }
    res.status(200).json(docs);
  });
};
