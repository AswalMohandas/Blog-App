import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/blogs/get-all-blogs"
      );

      setBlogs(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);



  return (
    <Row>
      {blogs.map((blog) => (
        <Col md={4} key={blog._id} className="mb-4">
          <div
            className="card h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/blog/${blog._id}`)}
          >
           <img
            src={blog.src}
            alt={blog.title}
            className="card-img-top"
            style={{
            height: "200px",
            objectFit: "cover",
            }}
            />

            <div className="card-body">
              <h5>{blog.title}</h5>

              <p>
                <strong>Category:</strong> {blog.category}
              </p>

              <p>
                {blog.description.length > 100
                  ? `${blog.description.substring(0, 100)}...`
                  : blog.description}
              </p>
            </div>

            <div className="card-footer">
              <Button
                variant="primary"
                className="me-2"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/blog/${blog._id}`);
                }}
              >
                Read More
              </Button>

              

            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default BlogList;