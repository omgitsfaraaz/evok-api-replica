import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SIGN_IN, {
    expiresIn: "24h",
  });
};

export const validateToken = (res, token, next) => {
  jwt.verify(token, process.env.JWT_SIGN_IN, (err, payload) => {
    if (err) {
      res.status(401).json({ message: err });
    } else {
      next();
    }
  });
};

export const protect = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    res.status(401).json({ success: false, data: null, error: "Unauthorized" });
  }
  validateToken(res, req.headers.authorization.split("Bearer ")[1], next);
};

export const generateAdminToken = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "Username or password is incorrect" });
  }
  if (
    req.body.username !== process.env.ADMIN_USERNAME ||
    req.body.password !== process.env.ADMIN_PASSWORD
  ) {
    res.status(400).json({ message: "Username or password is incorrect" });
  }
  res
    .status(200)
    .json(jwt.sign({ username: req.body.username }, process.env.JWT_SIGN_IN));
};

export const protectAdmin = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(
    req.headers.authorization.split("Bearer ")[1],
    process.env.JWT_SIGN_IN,
    (err, payload) => {
      if (err) {
        res.status(401).json({ message: err });
      }
    }
  );
  next();
};
