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
