const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProduct,
  insertProduct,
  deleteProduct,
} = require("../controllers/products");

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", insertProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
