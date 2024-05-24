const asyncHandler = require("express-async-handler");
const Product = require("../model/productsModel");
const getAllProducts = asyncHandler(async (req, res) => {
  res.send("get all products");
});
const getSingleProduct = asyncHandler(async (req, res) => {
  res.send(`get the product with id ${req.params.productId}`);
});
const deleteProduct = asyncHandler(async (req, res) => {
  res.send(`get the product with id ${req.params.productId}`);
});
const updateProduct = asyncHandler(async (req, res) => {
  res.send(`get the product with id ${req.params.productId}`);
});
module.exports = { getAllProducts, getSingleProduct, deleteProduct, updateProduct };
