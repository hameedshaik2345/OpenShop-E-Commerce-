require("dotenv").config();
const app = require("./src/app");
const { connectDB } = require("./src/config/db");

// Connect to MongoDB
connectDB();

// Only listen locally. Vercel will use the exported app directly.
if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on PORT: ${process.env.PORT || 3000}`);
  });
}

// Export the app for Vercel Serverless Functions
module.exports = app;