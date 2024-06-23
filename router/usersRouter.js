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
router.route("/").post(createUser).get(isAdmin, getAllUsers);
router.route("/userId").delete(isAdmin, deleteUser).get(isAdmin, getSingleUser);
router.route("/logout").post(logout);
router.route("/login").post(loginUser);
router.route("/profile").put(protectedRoute, updateUser).get(protectedRoute, getUserDetail);
module.exports = router;
