/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

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
router.patch("/:id", authMiddleware, updateOrder);
router.delete("/deleteOrder", authMiddleware, deleteOrder);

module.exports = router;
