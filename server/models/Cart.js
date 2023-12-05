const mongoose = require("mongoose");
const Product = require("./Product");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "Must provide user id"],
    },
    products: {
      type: [Object],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
