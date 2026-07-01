import React, { useEffect, useState } from "react";
import api from "../MainUrl";
import Navigation from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { FiBookOpen, FiEdit3, FiTag, FiUser, FiClock, FiArrowRight } from "react-icons/fi";
import './MyBlogs.css';

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/api/blogs/myblogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(response.data);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Scroll reveal
  useEffect(() => {
    if (!loading) {
      const els = document.querySelectorAll('.my-blog-card');
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
        { threshold: 0.1 }
      );
      els.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [loading, blogs]);

  return (
    <div className="page-wrapper">
      <Navigation />
      <div className="my-blogs-page">
        <div className="my-blogs-orb-1" />
        <div className="my-blogs-orb-2" />

        <div className="my-blogs-container">
          {/* Header */}
          <div className="my-blogs-header">
            <div className="my-blogs-header-icon"><FiBookOpen /></div>
            <h1 className="my-blogs-title">My Articles</h1>
            <p className="my-blogs-subtitle">
              {blogs.length > 0
                ? `You have written ${blogs.length} article${blogs.length !== 1 ? 's' : ''}`
                : 'Start sharing your stories'}
            </p>
            <button
              className="create-new-btn"
              onClick={() => navigate('/create-blog')}
            >
              <FiEdit3 /> Write New Article
            </button>
          </div>

          <div className="my-blogs-neon-line" />

          {/* Content */}
          {loading ? (
            <div className="my-blogs-loading">
              <div className="my-blogs-spinner" />
              <p>Loading your articles...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="my-blogs-empty">
              <div className="empty-icon-big"><FiBookOpen /></div>
              <h3>No articles yet</h3>
              <p>You haven't written any articles yet. Start sharing your ideas!</p>
              <button className="create-new-btn" onClick={() => navigate('/create-blog')}>
                <FiEdit3 /> Write Your First Article
              </button>
            </div>
          ) : (
            <div className="my-blogs-grid">
              {blogs.map((blog, i) => (
                <div
                  key={blog._id}
                  className="my-blog-card"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                  onClick={() => navigate(`/blog/${blog._id}`)}
                >
                  {/* Image */}
                  <div className="my-card-image">
                    {blog.src ? (
                      <img src={blog.src} alt={blog.title} />
                    ) : (
                      <div className="my-card-img-placeholder"><FiBookOpen /></div>
                    )}
                    <div className="my-card-img-overlay" />
                    {blog.category && (
                      <span className="my-card-badge"><FiTag /> {blog.category}</span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="my-card-body">
                    <h3 className="my-card-title">{blog.title}</h3>
                    <p className="my-card-snippet">
                      {blog.description?.substring(0, 100)}
                      {blog.description?.length > 100 ? '...' : ''}
                    </p>

                    <div className="my-card-meta">
                      <span><FiUser /> {blog.author || 'You'}</span>
                      <span><FiClock /> {Math.ceil((blog.description?.split(' ').length || 100) / 200)} min</span>
                    </div>

                    <div className="my-card-actions">
                      <button
                        className="my-action-btn view"
                        onClick={(e) => { e.stopPropagation(); navigate(`/blog/${blog._id}`); }}
                      >
                        <FiArrowRight /> Read
                      </button>
                      <button
                        className="my-action-btn edit"
                        onClick={(e) => { e.stopPropagation(); navigate(`/edit-blog/${blog._id}`); }}
                      >
                        <FiEdit3 /> Edit
                      </button>
                    </div>
                  </div>

                  <div className="my-card-glow" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default MyBlogs;