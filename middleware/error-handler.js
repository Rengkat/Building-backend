const CustomError = require("../error/custom-error");
const CustomErrorMiddlewear = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
  } else {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
module.exports = CustomErrorMiddlewear;
