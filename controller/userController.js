const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
// const bcyrpt = require('')
const User = require("../model/userModel");
const CustomError = require("../error/custom-error");
const createUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { firstName, surname, phone, email, password } = req.body;
  // if (!firstName || !surname || !phone || !email || !password) {
  //   throw new CustomError("Please enter fields", 400);
  // }
  // //check if user exiswt first
  // const userExist = await User.findOne({ email });
  // if (userExist) {
  //   throw new CustomError("User already exist", 400);
  // } else {
  //   const user = await User.create({
  //     firstName,
  //     surname,
  //     phone,
  //     email,
  //     //encrypt
  //     password,
  //   });
  //   res.status(201).json({ message: "account successfully created", success: true });
  // }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError("Please enter all fields", 400);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("User does not exist", 400);
  }
  // const token = jwt.sign({user?._id, user?.firstName, user?.surname},process.env.JWT_SECRETE, {expiresIn:'2d'})
  res.status(200).json({ message: "user successfully login", success: true, token });
});
const getUserDetail = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  const user = await User.findOne({ _id });
  if (!user) {
    throw new CustomError("Sorry, user not found", 400);
  } else {
  }
});
const logout = asyncHandler(async (req, res) => {});
const updateUser = asyncHandler(async (req, res) => {
  const detail = req.body;
  const tokenHeaders = req.headers.authorization;
});
module.exports = { createUser, loginUser, updateUser, logout, getUserDetail };
