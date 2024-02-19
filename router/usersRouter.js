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
router.route("/login").post(loginUser);
router.route("/userID").put(updateUser).get(getUserDetail);
module.exports = router;
