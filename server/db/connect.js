/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/footwear";

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
