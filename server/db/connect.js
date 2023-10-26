const mongoose = require("mongoose");
const connectionString = "mongodb://127.0.0.1:27017/footwear";

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
