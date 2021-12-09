const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  //1. destructuring jwt_token from req.headers (error if token not exist)

  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "not authorize" });
  }

  //2. verify jwt_token

  try {
    const decodedToken = jwt.verify(token, "arabarchon");
    req.user = decodedToken;
  } catch (e) {
    return res.status(403).json({ message: "authorize error" });
  }

  //3. run next middleware

  next();
};

module.exports = authMiddleware;
