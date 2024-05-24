const express = require("express");
// const protect = require("../middleware/authMiddleware");
const {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/:productId").get(getSingleProduct).delete(deleteProduct).patch(updateProduct);
module.exports = router;
