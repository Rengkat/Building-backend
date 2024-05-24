const express = require("express");
const {
  getAllUserSaveProduct,
  getSingleUserSaveProduct,
  deleteSaveProduct,
} = require("../controller/savedItemsController");
const router = express.Router();

router.route("/").get(getAllUserSaveProduct);
router.route("/:productId").get(getSingleUserSaveProduct).delete(deleteSaveProduct);
