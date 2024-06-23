const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const CustomError = require("../error/custom-error");
const User = require("../model/userModel");
const protectedRoute = asyncHandler(async (req, res, next) => {
  let jwtToken;
  jwtToken = req.cookies.token;
  if (jwtToken) {
    const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = await User.findById(decode.userId).select("-password");
    next();
  } else {
    throw new CustomError("User unauthorized", 401);
  }
});
const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  }
  throw new CustomError("Not an admin, unauthorized");
});
module.exports = { protectedRoute, isAdmin };
