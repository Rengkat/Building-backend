const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String, required: true, unique },
  email: { type: String, required: true, unique },
  password: { type: String, required: true },
});
module.exports = mongoose.model("User", UserSchema);
