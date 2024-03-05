const express = require("express");
// const protect = require("../middleware/authMiddleware");
const { getProducts, getSingleProduct } = require("../controller/productController");
const router = express.Router();

router.route("/").get(getProducts);
router.route("/productId").get(getSingleProduct);
module.exports = router;
