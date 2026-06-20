const { ObjectId }=require("mongodb");
const {getDB}=require("../config/db");
const productCollection=()=>{
  return getDB().collection("products");
};
const createProduct=async(productData)=>{
  return await productCollection().insertOne(productData);
};
const getAllProducts=async()=>{
  return await productCollection().find().toArray();
};
const getProductById=async(id)=>{
  return await productCollection().findOne({_id:new ObjectId(id)});
};
const deleteProduct=async(id)=>{
  return await productCollection().deleteOne({
    _id:new ObjectId(id),
  });
};
module.exports={
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
}