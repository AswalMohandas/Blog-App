const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { connectDB} = require("./connect.js");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

connectDB();


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
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

module.exports = app;