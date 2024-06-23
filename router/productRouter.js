const express = require("express");
// const protect = require("../middleware/authMiddleware");
const {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProduct,
} = require("../controller/productController");
const { isAdmin, protect } = require("../middleware/authMiddleware");
const router = express.Router();

// router.route("/").post(isAdmin, createProduct).get(getAllProducts);
// router
//   .route("/:productId")
//   .get(getSingleProduct)
//   .delete(protect, isAdmin, deleteProduct)
//   .put(protect, updateProduct);
module.exports = router;
