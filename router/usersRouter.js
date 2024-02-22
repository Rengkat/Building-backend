const express = require("express");
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
router.route("/:userId").put(updateUser).get(getUserDetail);
module.exports = router;
