const SavedItems = require("../model/savedItemsModel");
const asyncHandler = require("express-async-handler");

const getAllUserSaveProduct = asyncHandler(async (req, res) => {
  const products = await SavedItems.find({ user: req.user._id });
  if (products) {
    return res.status(200).json({ products, ok: true });
  }
  return res.status(401).json({ message: "No products", ok: false });
});
const getSingleUserSaveProduct = asyncHandler(async (req, res) => {
  const product = await SavedItems.findById(req.params.productId);

  if (product) {
    return res.status(200).json({ ok: true, product });
  } else {
    return res.status(404).json({ message: "No product found", ok: false });
  }
});
const deleteSaveProduct = asyncHandler(async (req, res) => {
  const deletedProduct = await SavedItems.findByIdAndDelete(req.params.productId);

  if (deletedProduct) {
    res.status(200).json({ message: "Product deleted successfully", ok: true });
  } else {
    res.status(404).json({ message: "Product not found", ok: false });
  }
});
module.exports = { getAllUserSaveProduct, getSingleUserSaveProduct, deleteSaveProduct };
