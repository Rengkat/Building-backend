const express = require("express");
const protectedRoute = require("../middleware/authMiddleware");
const {
  getAllUserSaveProduct,
  getSingleUserSaveProduct,
  deleteSaveProduct,
} = require("../controller/savedItemsController");
const router = express.Router();

router.route("/").get(protectedRoute, getAllUserSaveProduct);
router
  .route("/:productId")
  .get(protectedRoute, getSingleUserSaveProduct)
  .delete(protectedRoute, deleteSaveProduct);
module.exports = router;
