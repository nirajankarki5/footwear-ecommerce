/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const authMiddleware = async (req, res, next) => {
  console.log(req.headers);
  const authHeader = req.headers.authorization;

  //   token is in form "Bearer abcxyz...."
  /*
    in frontend, pass headers: {
            Authorization: "Bearer ${token}"
        }
    while accessing protected route
  */

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomAPIError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, email } = decoded; // get id and email from token

    // assign id and email to the req.user and fetch id in controller
    req.user = { id, email };
    next();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = authMiddleware;
