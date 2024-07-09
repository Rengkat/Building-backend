const express = require("express");
const {
  createUser,
  updateUser,
  loginUser,
  logout,
  getUserDetail,
  deleteUser,
  getSingleUser,
  getAllUsers,
} = require("../controller/userController");
const rateLimiter = require("express-rate-limit");
const apiRateLimit = rateLimiter({
  window: 10 * 60 * 1000,
  max: 10,
  message: {
    message: "Too may request. Try in 10 minutes time",
  },
});
const { protectedRoute, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();
router.route("/profile").patch(protectedRoute, updateUser).get(protectedRoute, getUserDetail);
router.route("/").get(protectedRoute, isAdmin, getAllUsers);
router.route("/register").post(apiRateLimit, createUser);
router.route("/logout").post(logout);
router.route("/login").post(apiRateLimit, loginUser);
router
  .route("/:userId")
  .delete(protectedRoute, isAdmin, deleteUser)
  .get(protectedRoute, isAdmin, getSingleUser);
module.exports = router;
