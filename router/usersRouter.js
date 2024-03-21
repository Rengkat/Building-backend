const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createUser,
  updateUser,
  loginUser,
  logout,
  getUserDetail,
} = require("../controller/userController");
const router = express.Router();
router.route("/").post(createUser);
router.route("/logout").post(logout);
router.route("/login").post(loginUser);
router.route("/profile").put(protect, updateUser).get(protect, getUserDetail);
module.exports = router;
