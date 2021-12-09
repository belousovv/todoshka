const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, "arabarchon", { expiresIn: "1hr" });
};

module.exports = jwtGenerator;
