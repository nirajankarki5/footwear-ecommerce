const express = require("express");

const productsRoute = require("./routes/products");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productsRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server is listening at port 5000");
});
