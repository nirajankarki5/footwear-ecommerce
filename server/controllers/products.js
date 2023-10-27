const products = require("../data");

const getAllProducts = (req, res) => {
  res.json({ products });
};

module.exports = {
  getAllProducts,
};
