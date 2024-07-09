const express = require("express");
const users = require("./router/usersRouter");
const products = require("./router/productRouter");
const cart = require("./router/cartRouter");
const saveItems = require("./router/savedItemsRoute");
const notFound = require("./middleware/notFound");
const connectDB = require("./db/connectDB");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const helmet = require("helmet");
// const xss = require("xss");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.static("./public"));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
// app.use(xss());
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/user/cart", cart);
app.use("/api/user/saveItems", saveItems);
app.use(notFound);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Starting on port ${port}`));
  } catch (error) {}
};
start();
