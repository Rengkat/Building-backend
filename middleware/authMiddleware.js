const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const CustomError = require("../error/custom-error");
const User = require("../model/userModel");
const protectedRoute = asyncHandler(async (req, res, next) => {
  const jwtToken = req.cookies.token;
  if (jwtToken) {
    try {
      const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
      console.log("Decoded token:", decode); // Debugging line
      req.user = await User.findById(decode.userId).select("-password");
      console.log("User found:", req.user); // Debugging line
      if (!req.user) {
        throw new CustomError("User not found", 404);
      }
      next();
    } catch (error) {
      console.error("Error in protectedRoute middleware:", error); // Debugging line
      throw new CustomError("User unauthenticated", 401);
    }
  } else {
    throw new CustomError("User unauthenticated", 401);
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  console.log("User in isAdmin middleware:", req.user); // Debugging line
  if (req.user && req.user.isAdmin) {
    return next();
  }
  throw new CustomError("Not an admin, unauthorized");
});
module.exports = { protectedRoute, isAdmin };
