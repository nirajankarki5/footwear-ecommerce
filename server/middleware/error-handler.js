/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

const CustomAPIError = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
  console.log(err);

  //   if we throw new CustomAPIError, it goes to if block
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res.status(500).json({ msg: err.message });
  // .json({ msg: "Something went wrong!!!, Please try again" });
};

module.exports = errorHandler;
