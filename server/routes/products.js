const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProduct,
  insertProduct,
} = require("../controllers/products");

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", insertProduct);

module.exports = router;
