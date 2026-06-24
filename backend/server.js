const express = require("express");
const cors = require("cors");
const { connectDB } = require("./connect.js");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Static files
app.use("/images", express.static("public/images"));

// Test route
app.get("/", (req, res) => {
  res.send("Server Working");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// Run locally only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for Vercel
module.exports = app;