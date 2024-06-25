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
const { protectedRoute, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();
router.route("/profile").patch(protectedRoute, updateUser).get(protectedRoute, getUserDetail);
router.route("/").get(protectedRoute, isAdmin, getAllUsers);
router.route("/register").post(createUser);
router.route("/logout").post(logout);
router.route("/login").post(loginUser);
router
  .route("/:userId")
  .delete(protectedRoute, isAdmin, deleteUser)
  .get(protectedRoute, isAdmin, getSingleUser);
module.exports = router;
