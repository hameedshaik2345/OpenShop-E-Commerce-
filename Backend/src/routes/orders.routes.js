const express = require("express");
const router = express.Router();
const ordersController = require("../handlers/orders.handler");

router.get("/", ordersController.getAllOrders);
router.post("/", ordersController.createOrder);
router.get("/:id", ordersController.getOrderById);
router.delete("/:id", ordersController.deleteOrder);
module.exports = router;
