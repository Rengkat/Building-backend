const express = require("express");
const users = require("./router/usersRouter");
const notFound = require("./middleware/notFound");
const connectDB = require("./db/connectDB");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/api/user", users);
app.use(notFound);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Starting on port ${port}`));
  } catch (error) {}
};
start();
