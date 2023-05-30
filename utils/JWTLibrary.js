const jwt = require("jsonwebtoken");
require("dotenv").config();

// generate token by payload
const generateToken = async (payload) => {
  // taking jwt secret key from env
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  //   returning token
  return token;
};

// decode token
const decodeToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = {
  generateToken,
  decodeToken,
};
