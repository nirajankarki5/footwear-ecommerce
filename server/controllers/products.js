const Product = require("../models/Product");

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

  // const products = await Product.find(queryObject);
  let result = Product.find(queryObject); // no await here

  // PAGINATION
  // by default, no of products(limit) is 15 and page is 1
  const page = req.query.page || 1;
  const limit = req.query.limit || 15;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const products = await result; // use await here

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
