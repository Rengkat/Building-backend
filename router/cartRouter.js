const express = require("express");
const protectedRoute = require("../middleware/authMiddleware");
const {
  getAllCartProducts,
  getSingleCartProduct,
  updateCartProduct,
  deleteCartProduct,
  addCartProduct,
} = require("../controller/cartController");
const router = express.Router();

router
  .route("/userId")
  .get(protectedRoute, getAllCartProducts)
  .post(protectedRoute, addCartProduct);
router
  .route("/productId")
  .get(protectedRoute, getSingleCartProduct)
  .patch(protectedRoute, updateCartProduct)
  .delete(protectedRoute, deleteCartProduct);
module.exports = router;
