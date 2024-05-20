const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
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

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // Find the user by email (case insensitive)
  const user = await User.findOne({ email: { $regex: new RegExp(email, "i") } });

  // Check if user exists and password matches
  if (user && (await user.matchedPassword(password))) {
    const token = generateToken(res, user._id);

    return res.status(201).json({
      message: "User successfully logged in",
      success: true,
      token,
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
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
  const user = await User.findById(req.user._id);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.surname = req.body.surname || user.surname;
    user.phone = req.body.phone || user.phone;
    //update user
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      surname: updatedUser.surname,
      phone: updatedUser.phone,
    });
  } else {
    throw new CustomError("Sorry invalid user", 401);
  }
});
module.exports = { createUser, loginUser, updateUser, logout, getUserDetail };
