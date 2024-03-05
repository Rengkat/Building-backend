const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const CustomError = require("../error/custom-error");
const User = require("../model/userModel");
const protect = async (req, res, next) => {
  let jwtToken;
  jwtToken = req.cookie.token;
  if (jwtToken) {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    // req.user = await User.findById(decode.userId);
    next();
  } else {
    throw new CustomError("User unauthorized", 401);
  }
};
module.exports = protect;
