const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProduct,
  insertProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/products");

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", insertProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);

module.exports = router;
