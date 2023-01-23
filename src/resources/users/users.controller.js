import { User } from "./users.model.js";
import { generateToken } from "../../utils/auth.js";

const resBuilder = (success, data, error) => {
  return {
    success,
    data,
    error,
  };
};

export const register = async (req, res) => {
  const registerParams = [
    "email",
    "lastname",
    "firstname",
    "mobile_number",
    "password",
    "dob",
  ];
  registerParams.map((ele) => {
    if (!req.body[ele]) {
      return res.status(400).json(resBuilder(false, null, `${ele} is missing`));
    }
  });
  await User.create(req.body)
    .then((createdUser) =>
      res.status(201).json(resBuilder(true, createdUser, null))
    )
    .catch((err) => res.status(400).json(resBuilder(false, null, err)));
};

export const customerToken = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    res.status(400).json(resBuilder(false, null, "Invalid email or password"));
  }
  const passwordMatch = await user.validatePasssword(req.body.password);
  if (!passwordMatch) {
    res.status(400).json(resBuilder(false, null, "Invalid email or password"));
  }
  res.status(200).json(generateToken(user));
  // res.end();
};
