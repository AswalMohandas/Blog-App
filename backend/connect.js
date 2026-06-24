const mongoose = require("mongoose");
const Blog = require("./models/blog.js");
const blogs = require("./Data.js");
const cloudinary = require("./config/Cloudinary.js");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI );
    
    console.log("MongoDB Connected ✅");
  await seedBlogs()
  } catch (err) {
    console.log("MongoDB Error ❌", err);
  }
}



async function seedBlogs() {
  try {
    await Blog.deleteMany({});

    const blogsWithCloudinary = [];

    for (const blog of blogs) {
      const result = await cloudinary.uploader.upload(
        `./public/images/${blog.src}`,
        { folder: "blog_images" }
      );

      blogsWithCloudinary.push({
        ...blog,
        src: result.secure_url,
      });
    }

    await Blog.insertMany(blogsWithCloudinary);

    console.log("Blogs inserted ✅");
  } catch (err) {
    console.log("Seed Error ❌", err);
  }
}
module.exports = {
  connectDB,
};



