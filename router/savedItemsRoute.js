const express = require("express");
const {
  saveProduct,
  getAllUserSaveProduct,
  getSingleUserSaveProduct,
  deleteSaveProduct,
} = require("../controller/savedItemsController");
const { protectedRoute } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protectedRoute, saveProduct).get(protectedRoute, getAllUserSaveProduct);
router
  .route("/:productId")
  .get(protectedRoute, getSingleUserSaveProduct)
  .delete(protectedRoute, deleteSaveProduct);
module.exports = router;
