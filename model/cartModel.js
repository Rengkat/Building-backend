const mongoose = require("mongoose");
const CartSchema = mongoose.Schema({
  // userId this will be a reference
  // product this will also be a reference object
});
module.exports = mongoose.model("Cart", CartSchema);
