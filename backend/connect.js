const mongoose = require("mongoose");
const Blog = require("./models/Blog");
const blogs = require("./Data.js");


async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/blogs2");
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.log("MongoDB Error ❌", err);
  }
}

async function seedBlogs() {
  try {
    const count = await Blog.countDocuments();

    if (count === 0) {
      await Blog.insertMany(blogs);
      console.log("Blogs inserted ✅");
    } else {
      console.log("Blogs already exist ⚡");
    }
  } catch (err) {
    console.log("Seed Error ❌", err);
  }
}

module.exports = {
  connectDB,
  seedBlogs
};



