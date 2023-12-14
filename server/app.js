const express = require("express");
require("dotenv").config();
require("express-async-errors");
const cors = require("cors");

const connectDB = require("./db/connect");
// Router
const productsRoute = require("./routes/products");
const userRoute = require("./routes/user");
const cartRouter = require("./routes/cart");

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

// Export the Express API (for vercel - deployment)
module.exports = app;
