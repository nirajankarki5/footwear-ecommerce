const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide product name"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Must provide product price"],
  },
  desc: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
  },
  brand: {
    type: String,
    required: true,
    // enum: {
    //   values: ["Nike", "Under Armour", "New Balance"],
    //   message: "{VALUE} is not supported",
    // },
  },
  sizes: {
    type: [String],
    required: [true, "Must provide sizes"],
  },
  image: {
    type: String,
    required: [true, "Must provide image"],
  },
});

module.exports = mongoose.model("Product", ProductSchema);
