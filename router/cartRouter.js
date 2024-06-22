const express = require("express");
const protectedRoute = require("../middleware/authMiddleware");
const {
  getAllCartProducts,
  getSingleCartProduct,
  deleteCartProduct,
  addCartProduct,
  updateProductQuantity,
} = require("../controller/cartController");
const router = express.Router();

router
  .route("/userId")
  .get(protectedRoute, getAllCartProducts)
  .post(protectedRoute, addCartProduct);
router
  .route("/productId")
  .get(protectedRoute, getSingleCartProduct)
  .put(protectedRoute, updateProductQuantity)
  .delete(protectedRoute, deleteCartProduct);
module.exports = router;
