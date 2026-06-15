import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [src, setSrc] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blogs/blog/${id}`
        );

        const blog = response.data;

        setTitle(blog.title);
        setDescription(blog.description);
        setAuthor(blog.author);
        setCategory(blog.category);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [id]);

  const updateBlog = async () => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title",title);
    formData.append("description",description);
    formData.append("author", author);
    formData.append("category", category);

    if (src) {
      formData.append("src", src);
    }

    await axios.put(
      `http://localhost:5000/api/blogs/blog/${id}`,
   formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate(`/blog/${id}`);
  } catch (error) {
    console.log(error);
  }
  
};
  return (
    <div className="container mt-5">
      <h2>Edit Blog</h2>

      <input
        type="text"
        className="form-control mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        className="form-control mb-3"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        type="text"
        className="form-control mb-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="file"
        className="form-control mb-3"
        onChange={(e) => setSrc(e.target.files[0])}
      />

      <textarea
        className="form-control mb-3"
        rows="5"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="btn btn-success"
        onClick={updateBlog}
      >
        Update Blog
      </button>
    </div>
  );
}

export default EditBlog;