const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const CustomError = require("../error/custom-error");
const User = require("../model/userModel");
const protect = (req, res, next) => {
  let token;
  token = req.cookie.token;
  if (!token) {
    throw new CustomError("User unauthorized", 401);
  }
  const decode = jwt.verify(token);
  req.userId = decode.userId;
};
module.exports = protect;
