const express = require("express");
const protectedRoute = require("../middleware/authMiddleware");
const {
  getAllCartProducts,
  getSingleCartProduct,
  updateCartProduct,
  deleteCartProduct,
} = require("../controller/cartController");
const route = express.Router();

route.route("/userId").get(getAllCartProducts);
route
  .route("/productId")
  .get(protectedRoute, getSingleCartProduct)
  .patch(protectedRoute, updateCartProduct)
  .delete(protectedRoute, deleteCartProduct);
module.exports = route;
