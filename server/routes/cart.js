const express = require("express");
const router = express.Router();

const {
  getAllCartItems,
  getUserCartItems,
  updateCart,
} = require("../controllers/cart");
const authMiddleware = require("../middleware/auth");

router.get("/", getAllCartItems);
router.get("/userCart", authMiddleware, getUserCartItems);
router.post("/userCart", authMiddleware, updateCart);

module.exports = router;
