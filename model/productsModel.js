const mongoose = require("mongoose");
const ProductsSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: Sting, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  reviews: [reviewsSchema],
  rating: { type: Number, required: true, default: 0 },
  brand: { type: String, required: true },
});
module.exports = mongoose.model("Products", ProductsSchema);
