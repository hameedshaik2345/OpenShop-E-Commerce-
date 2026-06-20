const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const orderCollection = () => {
  return getDB().collection("orders");
};
const createOrder = async (orderData) => {
  return await orderCollection().insertOne(orderData);
};
const getAllOrders = async () => {
  return await orderCollection().find().toArray();
};
const getOrderById = async (id) => {
  return await orderCollection().findOne({ _id: new ObjectId(id) });
};
const deleteOrder = async (id) => {
  return await orderCollection().deleteOne({ _id: new ObjectId(id) });
};
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
};
