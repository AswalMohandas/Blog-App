import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [src, setSrc] = useState(null);

  const uploadBlog = async () => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("author", author);
      formData.append("category", category);
      formData.append("src", src);

      await axios.post(
        "http://localhost:5000/api/blogs/create-blog",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );

      navigate("/");
    } catch (error) {
      console.log("Error Data:", error.response?.data);
      console.log("Error Status:", error.response?.status);
      console.log("Full Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Create Blog</h1>

      <input
        type="text"
        placeholder="Blog Title"
        className="form-control mb-3"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        className="form-control mb-3"
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        className="form-control mb-3"
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="file"
        className="form-control mb-3"
        onChange={(e) => setSrc(e.target.files[0])}
      />

      <textarea
        placeholder="Blog Description"
        className="form-control mb-3"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="btn btn-success"
        onClick={uploadBlog}
      >
        Upload Blog
      </button>
    </div>
  );
}

export default CreateBlog;