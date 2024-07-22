const CartItem = require("../model/cartModel");
const asyncHandler = require("express-async-handler");

const getAllCartProducts = asyncHandler(async (req, res) => {
  const user = req.user._id;

  const cartItems = await CartItem.find({ user }).populate("product");
  if (cartItems.length > 0) {
    res.status(200).json({ ok: true, cartItems });
  } else {
    res.status(404).json({ ok: false, message: "No items in the cart" });
  }
});
const getSingleCartProduct = asyncHandler(async (req, res) => {
  const product = await CartItem.findById(req.params.productId).populate("product");
  if (product) {
    return res.status(200).json({ product, ok: true });
  }
  return res.status(404).json({ message: "Product not found", ok: false });
});
const addCartProduct = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const { productId } = req.body;
  const existedInCart = await CartItem.findOne({ user, product: productId });
  if (existedInCart) {
    existedInCart.quantity += 1;
    await existedInCart.save();
    res.status(200).json({ existedInCart, ok: true });
  } else {
    const newCartItem = await CartItem.create({
      user,
      product: productId,
      quantity: 1,
    });
    res.status(201).json({ newCartItem, ok: true });
  }
});

const deleteCartProduct = asyncHandler(async (req, res) => {
  try {
    const product = await CartItem.findByIdAndDelete(req.body.productId);

    if (product) {
      return res.status(200).json({ message: "Product removed from cart", ok: true });
    } else {
      return res.status(404).json({ message: "Product not found", ok: false });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", ok: false });
  }
});
const updateProductQuantity = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const productId = req.params.productId || req.body.productId;

  if (quantity < 1) {
    const product = await CartItem.findByIdAndDelete(productId);
    if (product) {
      return res.status(200).json({ message: "Product removed from cart", ok: true });
    } else {
      return res.status(404).json({ message: "Product not found in cart", ok: false });
    }
  } else {
    const cartItem = await CartItem.findById(productId);
    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      return res.status(200).json(cartItem);
    } else {
      return res.status(404).json({ message: "Product not found in cart", ok: false });
    }
  }
});
const clearAllCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  await CartItem.deleteMany({ user: userId });

  res.status(200).json({ message: "All cart items cleared successfully" });
});
module.exports = {
  clearAllCart,
  addCartProduct,
  getAllCartProducts,
  getSingleCartProduct,
  deleteCartProduct,
  updateProductQuantity,
};
