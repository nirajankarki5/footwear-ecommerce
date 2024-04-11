/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

const Product = require("../models/Product");
const CustomAPIError = require("../errors/custom-error");

const getAllProducts = async (req, res) => {
  const { searchTerm, brand, size } = req.query;
  const queryObject = {};

  if (searchTerm) {
    queryObject.name = { $regex: searchTerm, $options: "i" };
  }
  if (brand) {
    queryObject.brand = { $regex: brand, $options: "i" };
  }
  if (size) {
    queryObject.sizes = { $in: size };
  }

  const products = await Product.find(queryObject);
  res.status(200).json(products);
};

const getProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new CustomAPIError("Product not found", 404);
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
    throw new CustomAPIError("Product not found", 404);
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
    throw new CustomAPIError("Product not found", 404);
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
