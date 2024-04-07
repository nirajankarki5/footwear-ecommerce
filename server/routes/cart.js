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
