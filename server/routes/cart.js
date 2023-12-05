const express = require("express");
const router = express.Router();

const { getAllCartItems, getUserCartItems } = require("../controllers/cart");
const authMiddleware = require("../middleware/auth");

router.get("/", getAllCartItems);
router.get("/userCart", authMiddleware, getUserCartItems);

module.exports = router;
