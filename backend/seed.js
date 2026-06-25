require("dotenv").config();
const { connectDB } = require("./connect");
const Blog = require("./models/blog");
const blogs = require("./Data");
const cloudinary = require("./config/Cloudinary");

async function seedBlogs() {
  try {
    await connectDB();

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
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedBlogs();