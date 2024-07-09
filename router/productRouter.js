const express = require("express");
// const protect = require("../middleware/authMiddleware");
const {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProduct,
} = require("../controller/productController");
const { isAdmin, protectedRoute } = require("../middleware/authMiddleware");
const { uploadProductImage } = require("../controller/uploadController");
const router = express.Router();

router.route("/").post(protectedRoute, isAdmin, createProduct).get(getAllProducts);
router
  .route("/:productId")
  .get(getSingleProduct)
  .delete(protectedRoute, isAdmin, deleteProduct)
  .patch(protectedRoute, updateProduct);
router.route("/upload").post(uploadProductImage);
module.exports = router;
