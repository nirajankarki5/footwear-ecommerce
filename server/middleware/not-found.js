/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

const notFound = (req, res) => {
  res.status(404).json({ msg: "Error, Not Found" });
};

module.exports = notFound;
