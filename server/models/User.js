const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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

// mongoose Instance methods (DOCS)
UserSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = mongoose.model("User", UserSchema);
