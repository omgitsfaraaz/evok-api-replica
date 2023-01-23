import { Wishlist } from "./wishlist.model.js";

export const addOrRemoveFromWishlist = async (req, res) => {
  const payloadParams = ["customerId", "productId", "favourite"];
  payloadParams.map((param) => {
    if (!req.body[param]) {
      res.status(400).json({ message: `${param} is missing` });
    }
  });
  const user = await Wishlist.findOne({ customer_id: req.body.customerId });

  if (!user && req.body.favourite == "true") {
    await Wishlist.create({
      customer_id: req.body.customerId,
      products: req.body.productId,
    });
    res.status(200).json(true);
  } else if (user && req.body.favourite == "false") {
    await Wishlist.updateOne(
      { customer_id: req.body.customerId },
      {
        $pullAll: {
          products: [{ _id: req.body.productId }],
        },
      }
    );
    res.status(200).json(true);
  } else if (user && req.body.favourite == "true") {
    await Wishlist.updateOne(
      { customer_id: req.body.customerId },
      {
        $addToSet: {
          products: [{ _id: req.body.productId }],
        },
      }
    );
    res.status(200).json(true);
  }
};

export const getWishlistProducts = async (req, res) => {
  if (!req.params.customerId) {
    res.status(400).json({ messsage: "customer id required" });
  } else {
    const user = await Wishlist.findOne({ customer_id: req.params.customerId });
    if (!user) {
      res.status(200).json([]);
    } else {
      user
        .populate("products")
        .then((wholeEntry) => {
          res.status(200).json(wholeEntry.products);
        })
        .catch((err) => res.status(400).json({ message: err }));
    }
  }
};
