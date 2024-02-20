const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  //hash password before saving
  //the user here is the -> this
  if (!this.isModified) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10); //number of rounds
    this.password = await bcrypt.hash(this.password, salt); // on the user, which is this, all the model properties created can be found
  }
});
UserSchema.method.matchedPassword = async function (enteredPassword) {
  //comparing the password
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("Users", UserSchema);
