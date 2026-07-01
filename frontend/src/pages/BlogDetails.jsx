import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../components/Navbar";
import Footer from "../components/Footer";
import { FiArrowLeft, FiEdit3, FiTrash2, FiUser, FiTag, FiClock, FiCalendar } from "react-icons/fi";
import './BlogDetails.css';

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const deleteBlog = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    setDeleting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/blogs/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to delete blog");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <>
        <Navigation />
        <div className="blog-detail-loading">
          <div className="detail-spinner" />
          <p>Loading article...</p>
        </div>
      </>
    );
  }

  const canManageBlog = user && (user.isAdmin || blog.userid === user.id);
  const readTime = blog.description
    ? `${Math.ceil(blog.description.split(' ').length / 200)} min read`
    : '2 min read';

  return (
    <div className="page-wrapper">
      <Navigation />

      {/* Hero Image */}
      <div className="detail-hero">
        {blog.src ? (
          <img src={blog.src} alt={blog.title} className="detail-hero-img" />
        ) : (
          <div className="detail-hero-placeholder" />
        )}
        <div className="detail-hero-overlay" />

        {/* Category badge over hero */}
        {blog.category && (
          <div className="detail-hero-badge">
            <FiTag /> {blog.category}
          </div>
        )}
      </div>

      {/* Article Content */}
      <div className="detail-content-wrapper">
        <div className="detail-container">

          {/* Back button */}
          <button className="detail-back-btn" onClick={() => navigate("/")}>
            <FiArrowLeft /> Back to Articles
          </button>

          {/* Article card */}
          <article className="detail-article-card">
            {/* Scan line */}
            <div className="detail-scan-line" />

            {/* Meta */}
            <div className="detail-meta-row">
              <span className="detail-meta-item">
                <FiUser /> {blog.author || 'Anonymous'}
              </span>
              <span className="detail-meta-item">
                <FiClock /> {readTime}
              </span>
              {blog.createdAt && (
                <span className="detail-meta-item">
                  <FiCalendar /> {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="detail-title">{blog.title}</h1>

            <div className="detail-divider" />

            {/* Body */}
            <div className="detail-body">
              {blog.description?.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Action buttons */}
            {canManageBlog && (
              <div className="detail-actions">
                <button
                  className="detail-action-btn edit"
                  onClick={() => navigate(`/edit-blog/${id}`)}
                  id="edit-blog-btn"
                >
                  <FiEdit3 /> Edit Article
                </button>
                <button
                  className={`detail-action-btn delete ${deleting ? 'loading' : ''}`}
                  onClick={deleteBlog}
                  disabled={deleting}
                  id="delete-blog-btn"
                >
                  {deleting ? <span className="btn-mini-spinner" /> : <FiTrash2 />}
                  {deleting ? 'Deleting...' : 'Delete Article'}
                </button>
              </div>
            )}
          </article>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default BlogDetails;