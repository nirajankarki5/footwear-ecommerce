const express = require("express");
require("dotenv").config();
require("express-async-errors");
const cors = require("cors");

// Database
const connectDB = require("./db/connect");
// Router
const productsRoute = require("./routes/products");
const userRoute = require("./routes/user");
const cartRouter = require("./routes/cart");

// middlewares
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const app = express();

// Enable all CORS requests
app.use(cors());

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productsRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.port || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

// (VERCEL) A Node.js Serverless Function must export a default function handler, for example:
export default function handler(request, response) {
  const { name = "World" } = request.query;
  return response.send(`Hello ${name}!`);
}

// Export the Express API (for vercel - deployment)
module.exports = app;
