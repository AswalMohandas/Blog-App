const Blog = require("../models/blog");

const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      userid: req.user.id,
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch blogs",
    });
  }
};

module.exports = {
  getMyBlogs,
};