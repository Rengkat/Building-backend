const asyncHandler = require("express-async-handler");
const getProducts = asyncHandler(async (req, res) => {
  res.send("get all products");
});
const getSingleProduct = asyncHandler(async (req, res) => {
  res.send(`get the product with id ${req.params.productId}`);
});
module.exports = { getProducts, getSingleProduct };
