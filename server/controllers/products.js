const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};

const getProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  res.status(200).json({ product });
};

module.exports = {
  getAllProducts,
  getProduct,
};
