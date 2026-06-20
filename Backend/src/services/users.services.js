const userModel = require("../models/users.models");

const getAllUsers = async () => {
  return await userModel.getAllUsers();
};

const getUserById = async (id) => {
  return await userModel.getUserById(id);
};

const createUser = async (userData) => {
  return await userModel.createUser(userData);
};

const deleteUser = async (id) => {
  return await userModel.deleteUser(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
};
