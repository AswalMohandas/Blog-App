const express = require('express');
const router = express.Router();
const Blog = require('../models/blog.js');
const upload = require('../Middleware/upload.js');
const auth = require("../middleware/auth");


//get all blogs
router.get('/get-all-blogs', async (req, res) => {

  try {
    const blogs = await Blog.find({});
    res.send({ count: blogs.length, data: blogs });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "something went wrong" });
  }
});


//get single blog
router.get('/blog/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Blog.findById(id);
    console.log(response);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "something went wrong" });
  }

});

//update blog
router.put(
  "/blog/:id",
  auth,
  upload.single("src"),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        });
      }

      // Allow if Admin OR Blog Owner
      if (
        !req.user.isAdmin &&
        blog.userid.toString() !== req.user.id
      ) {
        return res.status(403).json({
          message: "Not authorized to edit this blog",
        });
      }

      const updateData = {
  title: req.body.title,
  description: req.body.description,
  author: req.body.author,
  category: req.body.category,
  src: blog.image, // keep existing image
};

if (req.file) {
  updateData.src = req.file.path;
}

      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.status(200).json(updatedBlog);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Update failed",
      });
    }
  }
);

// create blog
router.post(
  "/create-blog",
  auth,
  upload.single("src"),
  async (req, res) => {
    try {

 console.log("BODY:", req.body);
      console.log("FILE:", req.file);
      console.log("USER:", req.user);
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      const blog = new Blog({
       title: req.body.title,
       description: req.body.description,
       author: req.body.author,
       category: req.body.category,
       src: req.file.path,
       userid: req.user.id, // logged-in user
      });

      await blog.save();

      res.status(201).json({
        success: true,
      });
    } catch (err) {
      console.error("FULL ERROR:", err);

      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

//Protect delete route
router.delete(
  "/blog/:id",
  auth,
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        });
      }

      // Allow if Admin OR Blog Owner
      if (
        !req.user.isAdmin &&
        blog.userid.toString() !== req.user.id
      ) {
        return res.status(403).json({
          message: "Not authorized to delete this blog",
        });
      }

      await Blog.findByIdAndDelete(req.params.id);

      res.json({
        message: "Blog deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Delete failed",
      });
    }
  }
);

module.exports = router;



