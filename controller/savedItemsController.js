const SavedItems = require("../model/savedItemsModel");
const asyncHandler = require("express-async-handler");
const saveProduct = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const productId = req.body.productId;
  const existedProduct = await SavedItems.findOne({ user, product: productId });
  if (existedProduct) {
    res.status(409).json({ message: "Product already saved" });
  } else {
    const newSaved = new SavedItems({
      user,
      product: productId,
    });
    await newSaved.save();
    res.status(201).json({ ok: true, message: "Product saved" });
  }
});
const getAllUserSaveProduct = asyncHandler(async (req, res) => {
  const products = await SavedItems.find({ user: req.user._id })
    .populate("product")
    .select("product");
  if (products.length > 0) {
    return res.status(200).json({ products, ok: true });
  }
  return res.status(401).json({ message: "No products", ok: false });
});
const getSingleUserSaveProduct = asyncHandler(async (req, res) => {
  const product = await SavedItems.findById(req.params.productId)
    .populate("product")
    .select("product");

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
module.exports = {
  saveProduct,
  getAllUserSaveProduct,
  getSingleUserSaveProduct,
  deleteSaveProduct,
};
