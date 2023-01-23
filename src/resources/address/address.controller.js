import { Address } from "./address.model.js";

export const addAddress = async (req, res) => {
  const addAddressParams = [
    "customer_id",
    "country_id",
    "street",
    "telephone",
    "postcode",
    "city",
    "firstname",
    "lastname",
  ];
  addAddressParams.map((param) => {
    if (!req.body[param]) {
      res.status(400).json({ message: `${param} is missing` });
    }
  });
  if (req.body.default_shipping) {
    const add1 = await Address.findOne({
      id: req.headers.authorization.split("Bearer ")[1],
      default_shipping: true,
    });
    if (add1) {
      await Address.findByIdAndUpdate(
        add1.id,
        { default_shipping: false, default_billing: false },
        { new: true }
      )
        .then(() => console.log("default shipping updated"))
        .catch((err) => console.log("err on updating", err));
      await Address.create(req.body)
        .then((createdAddress) => res.status(201).json(createdAddress))
        .catch((err) => res.status(400).json({ message: err }));
    }
  } else {
    await Address.create(req.body)
      .then((createdAddress) => res.status(201).json(createdAddress))
      .catch((err) => res.status(400).json({ message: err }));
  }
};

export const getAllAddresess = async (req, res) => {
  if (!req.params.customerId) {
    res.status(400).json({ message: "customer id required" });
  } else {
    await Address.find({ customer_id: req.params.customerId })
      .then((addresses) => res.status(200).json(addresses))
      .catch((err) => res.status(400).json({ message: err }));
  }
};
