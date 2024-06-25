const asyncHandler = require("express-async-handler");
const Product = require("../model/productsModel");
const CustomeError = require("../error/custom-error");
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({ ...req.body });
  if (product) {
    return res.status(201).json({ message: "Product successfully added", ok: true });
  }
  return res.status(401).json({ message: "Product not added", ok: false });
});
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
    return res.status(200).json({ ok: true, product });
  } else {
    return res.status(404).json({ message: "No product found", ok: false });
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
  const product = await Product.findById(req.params.productId);

  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.quantity = req.body.quantity || product.quantity;
    product.image = req.body.image || product.image;
    product.rating = req.body.rating || product.rating;
    product.brand = req.body.brand || product.brand;
    product.inStock = req.body.inStock || product.inStock;
    const updatedProduct = await product.save();
    return res.status(201).json({ updatedProduct, ok: true });
  }
  return res.status(404).json({ message: "Product not found", ok: false });
});
module.exports = { createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct };
