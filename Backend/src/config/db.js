const { MongoClient } = require("mongodb");

let db;

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    db = client.db(process.env.DB_NAME || "E_Commerce");
    console.log(`MongoDB Connected: ${process.env.MONGO_URI}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not connected!");
  }
  return db;
};

module.exports = { connectDB, getDB };
