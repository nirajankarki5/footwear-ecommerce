const Cart = require("../models/Cart");

const getAllCartItems = async (req, res) => {
  const cartItems = await Cart.find({});
  res.status(200).json(cartItems);
};

const getUserCartItems = async (req, res) => {
  const { id: userId } = req.user;
};

module.exports = { getAllCartItems, getUserCartItems };
