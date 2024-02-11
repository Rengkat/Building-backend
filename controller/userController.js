const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
// const bcyrpt = require('')
const User = require("../model/userModel");
const CustomError = require("../error/custom-error");
const createUser = asyncHandler(async (req, res) => {
  const { firstName, surname, phone, email, password } = req.body;
  if (!firstName || !surname || !phone || !email || !password) {
    throw new CustomError("Please enter fields", 400);
  }
  //check if user exiswt first
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new CustomError("User already exist", 400);
  } else {
    const user = await User.create({
      firstName,
      surname,
      phone,
      email,
      password,
    });
    res
      .status(201)
      .json({ message: "account successfully created", success: true });
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError("Please enter all fields", 400);
  }
  const user = await User.findOne({ email });
  const token = jwt.sign({user?._id, user?.firstName, user?.surname},process.env.JWT_SECRETE, {expiresIn:'2d'})
  res.status(200).json({ message: "user successfully login", success: true,token });
});
const updateUser = asyncHandler(async (req, res) => {
  const tokenHeaders = req.headers.authorization;

});
module.exports = { createUser, loginUser, updateUser };
