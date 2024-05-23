const asyncHandler = require("express-async-handler");

const getAllCartProducts = asyncHandler(async (req, res) => {
  res.send("all cart products");
});
const getSingleCartProduct = asyncHandler(async (req, res) => {
  res.send("all single product");
});
const deleteCartProduct = asyncHandler(async (req, res) => {
  res.send("all single product");
});
const updateCartProduct = asyncHandler(async (req, res) => {
  res.send("update cart product");
});
module.exports = { getAllCartProducts, getSingleCartProduct, deleteCartProduct, updateCartProduct };
