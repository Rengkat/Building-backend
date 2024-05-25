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
  const product = await Product.findOne({ _id: req.params.productId });

  if (product) {
    return res.status(200).json({ success: true, product });
  } else {
    return res.status(404).json({ message: "No product found", success: false });
  }
});
const deleteProduct = asyncHandler(async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.productId);

  if (deletedProduct) {
    return res.status(200).json({ message: "Product deleted successfully", success: true });
  } else {
    return res.status(404).json({ message: "Product not found", success: false });
  }
});
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ _id: req.params.productId });
  if (product) {
    product.name = req.product.name || product.name;
    product.price = req.product.price || product.price;
    product.description = req.product.description || product.description;
    product.category = req.product.category || product.category;
    product.quantity = req.product.quantity || product.quantity;
    product.image = req.product.image || product.image;
    product.rating = req.product.rating || product.rating;
    product.brand = req.product.brand || product.brand;
    product.inStock = req.product.inStock || product.inStock;
    const updatedProduct = await product.save();
    return res.status(201).json({ updatedProduct, ok: true });
  }
  return res.status(404).json({ message: "Product not found", success: false });
});
module.exports = { getAllProducts, getSingleProduct, deleteProduct, updateProduct };
