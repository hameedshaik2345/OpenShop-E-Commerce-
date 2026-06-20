const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Ensure MongoDB is connected before hitting routes (required for Vercel Serverless)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: "Database connection failed", error: error.message });
  }
});

const productsRouter = require("./routes/products.routes");
const ordersRouter = require("./routes/orders.routes");
const usersRouter = require("./routes/users.routes");

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter);

module.exports = app;
