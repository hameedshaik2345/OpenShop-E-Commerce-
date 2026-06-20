const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const productsRouter = require("./routes/products.routes");
const ordersRouter = require("./routes/orders.routes");
const usersRouter = require("./routes/users.routes");

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter);

module.exports = app;
