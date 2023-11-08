const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  const { searchTerm } = req.query;
  const queryObject = {};

  if (searchTerm) {
    queryObject.name = { $regex: searchTerm, $options: "i" };
  }

  const products = await Product.find(queryObject);
  res.status(200).json(products);
};

const getProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    return res.status(404).json({ msg: "No product found" });
  }

  res.status(200).json(product);
};

const insertProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id });
  if (!product) {
    return res.status(404).json({ msg: "No product found" });
  }

  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    return res.status(404).json({ msg: "No product found" });
  }

  res.status(200).json(product);
};

module.exports = {
  getAllProducts,
  getProduct,
  insertProduct,
  deleteProduct,
  updateProduct,
};
