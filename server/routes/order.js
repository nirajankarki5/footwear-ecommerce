const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrderById,
  getAllOrders,
  getOrderByUserId,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");
const authMiddleware = require("../middleware/auth");

router.post("/create", authMiddleware, createOrder);
router.get("/getOrderById", authMiddleware, getOrderById);
router.get("/getAllOrders", authMiddleware, getAllOrders);
router.get("/getOrderByUserId", authMiddleware, getOrderByUserId);
router.put("/updateOrder", authMiddleware, updateOrder);
router.delete("/deleteOrder", authMiddleware, deleteOrder);

module.exports = router;
