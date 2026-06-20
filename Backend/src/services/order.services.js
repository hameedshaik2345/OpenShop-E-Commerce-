const orderModel = require("../models/orders.models");

const getAllOrders = async () => {
  return await orderModel.getAllOrders();
};

const createOrder = async (data) => {
  return await orderModel.createOrder(data);
};

const getOrderById = async (id) => {
  return await orderModel.getOrderById(id);
};

const deleteOrder = async (id) => {
  return await orderModel.deleteOrder(id);
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  deleteOrder
};
