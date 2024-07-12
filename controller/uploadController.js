const path = require("node:path");
const cloudinary = require("cloudinary").v2;
const fs = require("node:fs");
const uploadLocalProductImage = async (req, res) => {
  //moving the image to public folder: public->upload
  //file exist
  //check format
  //check size
  if (!req.files) {
    res.status(401).json({ message: "No file uploaded" });
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startWith("images")) {
    res.status(401).json({ message: "Please upload an image" });
  }
  const maxSize = 5 * 1024;
  if (productImage.size > maxSize) {
    res.status(401).json({ message: "Image must be below 5Mb" });
  }
  const imagePath = path.join(__dirname, "../public/upload/" + `${productImage.name}`);
  await productImage.mv(imagePath);
  return res.status(201).json({ image: { src: `/uploads/${productImage.name}` } });
};
const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
    use_filename: true,
    folder: "Building-products-uploads",
  });
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(201).json({ img: { src: result.secure_url } });
};
module.exports = { uploadProductImage };
