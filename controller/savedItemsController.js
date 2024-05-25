const SavedItems = require("../model/savedItemsModel");
const asyncHandler = require("express-async-handler");

const getAllUserSaveProduct = asyncHandler(async (req, res) => {
  const products = await SavedItems.find({});
  if (products) {
    return res.status(200).json(products);
  }
  return res.status(401).json({ message: "No products" });
});
const getSingleUserSaveProduct = asyncHandler(async (req, res) => {
  const product = await SavedItems.findOne({ _id: req.params.productId });

  if (product) {
    return res.status(200).json({ success: true, product });
  } else {
    return res.status(404).json({ message: "No product found", success: false });
  }
});
const deleteSaveProduct = asyncHandler(async (req, res) => {
  const deletedProduct = await SavedItems.findByIdAndDelete(req.params.productId);

  if (deletedProduct) {
    res.status(200).json({ message: "Product deleted successfully", success: true });
  } else {
    res.status(404).json({ message: "Product not found", success: false });
  }
});
module.exports = { getAllUserSaveProduct, getSingleUserSaveProduct, deleteSaveProduct };
