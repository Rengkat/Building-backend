const express = require("express");
const {
  getAllCartProducts,
  getSingleCartProduct,
  deleteCartProduct,
  addCartProduct,
  updateProductQuantity,
} = require("../controller/cartController");
const { protectedRoute } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protectedRoute, getAllCartProducts).post(protectedRoute, addCartProduct);
router.route("/:productId").get(protectedRoute, getSingleCartProduct);
router.route("/updateQuantity").patch(protectedRoute, updateProductQuantity);
router.route("/delete").delete(protectedRoute, deleteCartProduct);

module.exports = router;
