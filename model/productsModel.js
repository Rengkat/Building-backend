const mongoose = require("mongoose");
const ProductsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    //   reviews: [reviewsSchema],
    rating: { type: Number, required: true, default: 0 },
    brand: { type: String, required: true },
    inStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Products", ProductsSchema);
