const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Must provide email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Must provide password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
