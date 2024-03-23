const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
// const bcyrpt = require('')
const User = require("../model/userModel");
const CustomError = require("../error/custom-error");
const createUser = asyncHandler(async (req, res) => {
  const { firstName, surname, phone, email, password } = req.body;
  if (!firstName || !surname || !phone || !email || !password) {
    throw new CustomError("Please enter fields", 400);
  }
  //check if user exist first
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new CustomError("User already exist", 400);
  } else {
    const user = await User.create({
      firstName,
      surname,
      phone,
      email,
      //encrypt
      password,
    });
    res.status(201).json({ message: "account successfully created", success: true });
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Please enter all fields", 400);
  }
  const user = await User.findOne({ email: { $regex: new RegExp(email, "i") } });

  if (user && (await user.matchedPassword(password))) {
    // const token = jwt.sign({user?._id, user?.firstName, user?.surname},process.env.JWT_SECRETE, {expiresIn:'2d'})
    generateToken(res, user._id);
    res.status(200).json({ message: "user successfully login", success: true });
  } else {
    throw new CustomError("Invalid email or password", 401);
  }
});
const getUserDetail = asyncHandler(async (req, res) => {
  const user = {
    userFirstName: req.user.firstName,
    userSurname: req.user.surname,
    phone: req.user.phone,
    email: req.user.email,
  };
  res.status(200).json(user);
});
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "user logged out" });
});
const updateUser = asyncHandler(async (req, res) => {
  const detail = req.body;
  const token = req.cookies("token");
  const userId = jwt.verify(token).userId;
  // const tokenHeaders = req.headers.authorization;
  const user = await User.findOneAndUpdate({ _id: userId }, detail);
  if (!user) {
    throw new CustomError("User not found", 401);
  }
});
module.exports = { createUser, loginUser, updateUser, logout, getUserDetail };
