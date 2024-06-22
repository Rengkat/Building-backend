const CartItem = require("../model/cartModel");
const asyncHandler = require("express-async-handler");

const getAllCartProducts = asyncHandler(async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user._id }).populate("product");

    if (!cartItems.length) {
      return res.status(404).json({ message: "No items in the cart" });
    }

    return res.status(200).json(cartItems);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});
const getSingleCartProduct = asyncHandler(async (req, res) => {
  const product = await CartItem.findById(req.params._id);
  if (product) {
    return res.status(200).json({ product, ok: true });
  }
  return res.status(404).json({ message: "Product not found", ok: false });
});
const addCartProduct = asyncHandler(async (req, res) => {
  req.body.user = user._id;
  const product = await CartItem.create(...req.body);
  if (product) {
    return res.status(201).json({ message: "Product added to cart", ok: true });
  }
  return res.status(401).json({ message: "Something went wrong" });
});
const deleteCartProduct = asyncHandler(async (req, res) => {
  const product = await CartItem.findByIdAndDelete(req.params._id);
  if (product) {
    return res.status(200).json({ message: "Product removed from cart", ok: true });
  }
  return res.status(404).json({ message: "Product not found", ok: false });
});
const updateProductQuantity = asyncHandler(async (req, res) => {
  const product = await CartItem.findByIdAndUpdate(req.params._id);

  if (product) {
    product.quantity = req.body.quantity || product.quantity;
    product.save();
    return res.status(201).json({ message: "cart updated", ok: true });
  }
  return res.status(401).json({ message: "Something went wrong", ok: false });
});
module.exports = {
  addCartProduct,
  getAllCartProducts,
  getSingleCartProduct,
  deleteCartProduct,
  updateProductQuantity,
};
