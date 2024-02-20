const notFound = (req, res) => {
  res.status(404).json({ message: "Sorry, resources not found" });
};
module.exports = notFound;
