const express = require("express");
const { createUser, updateUser, loginUser } = require("../controller/userController");
const router = express.Router();
router.route("/").post(createUser);
router.route("/login").post(loginUser);
router.route("/userID").put(updateUser);
module.exports = router;
