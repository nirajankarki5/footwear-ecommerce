const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {
  createUser,
  getUserById,
  login,
  logout,
} = require("../controllers/user");

router.post("/signup", createUser);
router.get("/:id", authMiddleware, getUserById);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
