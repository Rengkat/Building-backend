const express = require("express");
const users = require("./router/usersRouter");
const notFound = require("./middleware/notFound");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", users);
// app.use(notFound());
const start = () => {
  try {
    app.listen(port, () => console.log(`Starting on port ${port}`));
  } catch (error) {}
};
start();
