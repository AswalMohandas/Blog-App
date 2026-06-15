const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { connectDB, seedBlogs } = require("./connect.js");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

connectDB();
seedBlogs();

// Middleware
app.use(cors());
app.use(express.json());

// Static files (images)
app.use("/images", express.static("public/images"));

// Test route
app.get("/", (req, res) => {
  res.send("Server Working");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);


  
// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});