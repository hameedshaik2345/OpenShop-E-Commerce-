const productModel = require("../models/products.models");

const getAllProducts = async () => {
  return await productModel.getAllProducts();
};

const getProductById = async (id) => {
  return await productModel.getProductById(id);
};

const createProduct = async (data) => {
  return await productModel.createProduct(data);
};

const deleteProduct = async (id) => {
  return await productModel.deleteProduct(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
};

