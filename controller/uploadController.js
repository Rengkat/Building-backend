const path = require("node:path");
const uploadProductImage = async (req, res) => {
  const productImage = req.files.image;
  //moving the image to public folder: public->upload
  const imagePath = path.join(__dirname, "../public/upload/" + `${productImage.name}`);
  await productImage.mv(imagePath);
  return res.status(201).json({ image: { src: `/uploads/${productImage.name}` } });
};
module.exports = { uploadProductImage };
