import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../MainUrl";
import { FiArrowRight, FiUser, FiTag, FiClock, FiBookOpen } from "react-icons/fi";
import './BlogList.css';

function BlogCard({ blog, index }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  // 3D tilt on hover
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateZ(10px)`;
    };
    const handleLeave = () => {
      card.style.transform = 'perspective(700px) rotateY(0) rotateX(0) translateZ(0)';
      card.style.transition = 'transform 0.5s ease';
    };
    const handleEnter = () => { card.style.transition = 'transform 0.1s ease'; };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    card.addEventListener('mouseenter', handleEnter);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
      card.removeEventListener('mouseenter', handleEnter);
    };
  }, []);

  const readTime = blog.description
    ? `${Math.ceil(blog.description.split(' ').length / 200)} min read`
    : '2 min read';

  const snippet = blog.description
    ? blog.description.substring(0, 120) + (blog.description.length > 120 ? '...' : '')
    : '';

  return (
    <div
      className={`blog-card reveal delay-${(index % 6) * 100}`}
      ref={cardRef}
      onClick={() => navigate(`/blog/${blog._id}`)}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/blog/${blog._id}`)}
    >
      {/* Glow border on hover */}
      <div className="card-glow-border" aria-hidden="true" />

      {/* Image */}
      <div className="card-image-wrapper">
        {blog.src ? (
          <img
            src={blog.src}
            alt={blog.title}
            className="card-image"
            loading="lazy"
          />
        ) : (
          <div className="card-image-placeholder">
            <FiBookOpen />
          </div>
        )}
        <div className="card-image-overlay" />
        {blog.category && (
          <span className="card-category-badge">
            <FiTag /> {blog.category}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="card-body-content">
        <h3 className="card-title">{blog.title}</h3>
        <p className="card-snippet">{snippet}</p>

        <div className="card-meta">
          <span className="meta-item">
            <FiUser /> {blog.author || 'Anonymous'}
          </span>
          <span className="meta-item">
            <FiClock /> {readTime}
          </span>
        </div>

        <button
          className="card-read-btn"
          onClick={(e) => { e.stopPropagation(); navigate(`/blog/${blog._id}`); }}
        >
          <span>Read Article</span>
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
}

function BlogList({ searchQuery = "" }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/api/blogs/get-all-blogs');
        setBlogs(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Scroll reveal re-init after blogs load
  useEffect(() => {
    if (!loading) {
      const els = document.querySelectorAll('.blog-card.reveal');
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      els.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [loading, blogs]);

  const filtered = blogs.filter((b) => {
    const q = searchQuery.toLowerCase();
    return (
      b.title?.toLowerCase().includes(q) ||
      b.category?.toLowerCase().includes(q) ||
      b.author?.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="blog-loading">
        <div className="loading-orbs">
          <div className="loading-orb" />
          <div className="loading-orb delay-200" />
          <div className="loading-orb delay-400" />
        </div>
        <p className="loading-text">Loading articles...</p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="blog-empty">
        <div className="empty-icon"><FiBookOpen /></div>
        <h3>No articles found</h3>
        <p>Try a different search or check back later.</p>
      </div>
    );
  }

  return (
    <div className="blog-grid">
      {filtered.map((blog, index) => (
        <BlogCard key={blog._id} blog={blog} index={index} />
      ))}
    </div>
  );
}

export default BlogList;