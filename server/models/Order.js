const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
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
          image: String,
          brand: String,
          quantity: Number,
          price: Number,
          size: Number,
        },
      ],
      required: true,
    },
    totalCost: {
      type: Number,
    },
    shippingAddress: { type: String, required: true },
    billingAddress: { type: String, required: true },
    status: {
      type: String,

      enum: {
        values: ["Rejected", "Approved", "Pending"],
      },
      required: true,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
