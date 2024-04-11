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
  getAllCartItems,
  getUserCartItems,
  updateCart,
  deleteCartItems,
  deleteAllCart,
  removeCart,
} = require("../controllers/cart");
const authMiddleware = require("../middleware/auth");

router.get("/", getAllCartItems);
router.get("/userCart", authMiddleware, getUserCartItems);
router.post("/userCart", authMiddleware, updateCart);
router.delete("/userCart/:productId", authMiddleware, deleteCartItems);
router.delete("/deleteCart", authMiddleware, deleteAllCart);
router.delete("/removeCart", authMiddleware, removeCart);

module.exports = router;
