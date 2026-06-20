const { MongoClient } = require("mongodb");

let db;
let clientPromise;

const connectDB = async () => {
  if (db) return db;

  try {
    if (!clientPromise) {
      clientPromise = MongoClient.connect(process.env.MONGO_URI);
    }
    const client = await clientPromise;
    db = client.db(process.env.DB_NAME || "E_Commerce");
    console.log(`MongoDB Connected successfully`);
    return db;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    clientPromise = null;
    throw error;
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not connected!");
  }
  return db;
};

module.exports = { connectDB, getDB };
