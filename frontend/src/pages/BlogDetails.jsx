import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const deleteBlog = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/blogs/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Blog deleted successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Failed to delete blog"
      );
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blogs/blog/${id}`
        );

        setBlog(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <h2>Loading...</h2>;
  }
  const canManageBlog =
  user &&
  (
    user.isAdmin ||
    blog.userid === user.id 
   
  );

  return (
    <div className="container mt-5">
      <img
        src={blog.image}
        alt={blog.title}
        className="img-fluid mb-4"
      />

      <h1>{blog.title}</h1>

      <p>
        <strong>Category:</strong> {blog.category}
      </p>

      <p>
        <strong>Author:</strong> {blog.author}
      </p>

      <p>{blog.description}</p>

      <div className="mt-4">
        <Button
          variant="secondary"
          className="me-2"
          onClick={() => navigate("/")}
        >
          Back
        </Button>

        {canManageBlog  && (
          <>
            <Button
              variant="warning"
              className="me-2"
              onClick={() =>
                navigate(`/edit-blog/${id}`)
              }
            >
              Edit Blog
            </Button>

            <Button
              variant="danger"
              onClick={deleteBlog}
            >
              Delete Blog
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default BlogDetails;