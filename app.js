const express = require("express");
const path = require("node:path");
const users = require("./router/usersRouter");
const products = require("./router/productRouter");
const cart = require("./router/cartRouter");
const saveItems = require("./router/savedItemsRoute");
const notFound = require("./middleware/notFound");
const connectDB = require("./db/connectDB");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudniary = require("cloudinary").v2;
const cors = require("cors");
const helmet = require("helmet");
// const xss = require("xss");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 1000;
app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));
cloudniary.config({
  cloud_name: process.env.CLOUTINARY_CLOUD_NAME,
  api_key: process.env.CLOUTINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUTINARY_CLOUD_API_SECRET,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set the default route to serve the docgen HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use(cookieParser());
const corsOptions = {
  origin: "https://buildingxx.netlify.app",
  credentials: true,
};

app.use(cors(corsOptions));
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
