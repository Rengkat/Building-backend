const SavedItems = require("../model/savedItemsModel");
const asyncHandler = require("express-async-handler");

const getAllUserSaveProduct = asyncHandler(async (req, res) => {
  res.send("get all save products");
});
const getSingleUserSaveProduct = asyncHandler(async (req, res) => {
  res.send("get single save products");
});
const deleteSaveProduct = asyncHandler(async (req, res) => {
  res.send("delete save products");
});
module.exports = { getAllUserSaveProduct, getSingleUserSaveProduct, deleteSaveProduct };
