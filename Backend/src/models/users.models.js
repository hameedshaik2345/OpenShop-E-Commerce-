const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const usersCollection = () => {
  return getDB().collection("users");
};

const createUser = async (userData) => {
  return await usersCollection().insertOne(userData);
};

const getAllUsers = async () => {
  return await usersCollection().find().toArray();
};

const getUserById = async (id) => {
  return await usersCollection().findOne({ _id: new ObjectId(id) });
};

const deleteUser = async (id) => {
  return await usersCollection().deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
