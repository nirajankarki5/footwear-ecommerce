const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/footwear";

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
