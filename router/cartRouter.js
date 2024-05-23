const express = require("express");
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
  .get(getSingleCartProduct)
  .patch(updateCartProduct)
  .delete(deleteCartProduct);
