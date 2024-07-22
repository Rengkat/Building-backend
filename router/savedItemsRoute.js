const express = require("express");
const {
  saveProduct,
  getAllUserSaveProduct,
  getSingleUserSaveProduct,
  deleteSaveProduct,
  deleteAllSaveProduct,
} = require("../controller/savedItemsController");
const { protectedRoute } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protectedRoute, saveProduct).get(protectedRoute, getAllUserSaveProduct);
router.route("/:productId").get(protectedRoute, getSingleUserSaveProduct);
router.route("/delete").delete(protectedRoute, deleteSaveProduct);
router.route("/deleteAll").delete(protectedRoute, deleteAllSaveProduct);
module.exports = router;
