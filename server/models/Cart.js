const mongoose = require("mongoose");
const Product = require("./Product");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Must provide user id"],
      ref: "User",
    },
    products: {
      type: [
        {
          productId: String,
          name: String,
          //   image: String,
          brand: String,
          quantity: Number,
          price: Number,
          size: Number,
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
