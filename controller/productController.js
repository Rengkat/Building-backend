const asyncHandler = require("express-async-handler");
const Product = require("../model/productsModel");
const CustomeError = require("../error/custom-error");
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products) {
    return res.status(200).json(products);
  }
  return res.status(401).json({ message: "No products" });
});
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ _id: req.id });
});
const deleteProduct = asyncHandler(async (req, res) => {
  res.send(`get the product with id ${req.params.productId}`);
});
const updateProduct = asyncHandler(async (req, res) => {
  res.send(`get the product with id ${req.params.productId}`);
});
module.exports = { getAllProducts, getSingleProduct, deleteProduct, updateProduct };
