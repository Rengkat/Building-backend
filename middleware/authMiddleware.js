const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const CustomError = require("../error/custom-error");
const User = require("../model/userModel");

// Protected route middleware
const protectedRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  // console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        throw new CustomError("User not found", 404);
      }

      next();
    } catch (error) {
      throw new CustomError("User unauthenticated", 401);
    }
  } else {
    throw new CustomError("User unauthenticated", 401);
  }
});

// Admin check middleware
const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  throw new CustomError("Not an admin, unauthorized", 403);
});

module.exports = { protectedRoute, isAdmin };
