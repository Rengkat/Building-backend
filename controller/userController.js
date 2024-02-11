const asyncHandler = require("express-async-handler");
const createUser = asyncHandler(async (req, res) => {
  const { firstName, surname, phone, email, password } = req.body;
  res.status(201).json({ message: "account successfully created", success: true });
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({ message: "user successfully login", success: true });
});
const updateUser = asyncHandler(async (req, res) => {});
module.exports = { createUser, loginUser, updateUser };
