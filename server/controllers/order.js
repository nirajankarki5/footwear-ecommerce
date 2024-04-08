const Cart = require("../models/Cart");
const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json(orders);
};

const getOrderByUserId = async (req, res) => {
  const { id: userId } = req.user;

  const userOrderItems = await Order.find({ userId: userId });
  res.status(200).json(userOrderItems);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findOne({ _id: id });
  res.status(200).json(order);
};

const createOrder = async (req, res) => {
  const { id: userId } = req.user;
  const { shippingAddress, billingAddress, totalCost } = req.body;
  const userCartItems = await Cart.findOne({ userId: userId });
  const { products } = userCartItems;

  const newOrder = await Order.create({
    userId,
    products,
    totalCost,
    billingAddress,
    shippingAddress,
  });
  return res.status(201).json(newOrder);
};

const updateOrder = async (req, res) => {
  const { status } = req.body;

  const updatedOrder = await Order.findOneAndUpdate(
    { _id: req.params.id },
    {
      status,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  return res.status(200).json(updatedOrder);
};

const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params;

  let order = await Order.deleteOne({ _id: orderId });

  res.status(200).json({
    message: "Deletion successful!!",
  });
};

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  getOrderByUserId,
  updateOrder,
  deleteOrder,
};
