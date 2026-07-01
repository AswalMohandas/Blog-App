import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../MainUrl";
import Navigation from "../components/Navbar";
import Footer from "../components/Footer";
import { FiSave, FiImage, FiType, FiUser, FiTag, FiFileText, FiCheck } from "react-icons/fi";
import './BlogForm.css';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/api/blogs/blog/${id}`);
        const blog = response.data;
        setTitle(blog.title);
        setDescription(blog.description);
        setAuthor(blog.author);
        setCategory(blog.category);
        if (blog.src) setPreview(blog.src);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSrc(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const updateBlog = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("author", author);
      formData.append("category", category);
      if (src) formData.append("src", src);

      await api.put(`/api/blogs/blog/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess(true);
      setTimeout(() => navigate(`/blog/${id}`), 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["Technology", "Science", "Design", "Business", "Health", "Travel", "Food", "Art", "Other"];

  return (
    <div className="page-wrapper">
      <Navigation />
      <div className="blog-form-page">
        <div className="blog-form-orb orb-a" />
        <div className="blog-form-orb orb-b" />

        <div className="blog-form-container">
          <div className="blog-form-header">
            <div className="form-header-icon edit-icon"><FiSave /></div>
            <h1 className="form-header-title">Edit Article</h1>
            <p className="form-header-sub">Update your article details</p>
          </div>

          <div className="blog-form-card">
            <div className="form-scan-line" />

            <div className="blog-form-grid">
              <div className="form-fields">
                <div className="form-field">
                  <label className="form-label"><FiType /> Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="edit-title"
                  />
                </div>

                <div className="form-field">
                  <label className="form-label"><FiUser /> Author</label>
                  <input
                    type="text"
                    className="form-input"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    id="edit-author"
                  />
                </div>

                <div className="form-field">
                  <label className="form-label"><FiTag /> Category</label>
                  <div className="category-grid">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className={`cat-chip ${category === cat ? 'selected' : ''}`}
                        onClick={() => setCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label"><FiFileText /> Content</label>
                  <textarea
                    className="form-input form-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={8}
                    id="edit-content"
                  />
                </div>
              </div>

              <div className="form-image-section">
                <label className="form-label"><FiImage /> Cover Image</label>
                <label className="image-upload-zone" htmlFor="edit-blog-image">
                  {preview ? (
                    <img src={preview} alt="Preview" className="image-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <FiImage className="upload-icon" />
                      <p>Click to change cover image</p>
                      <span>PNG, JPG, WEBP up to 10MB</span>
                    </div>
                  )}
                  <input
                    id="edit-blog-image"
                    type="file"
                    accept="image/*"
                    className="file-input-hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <div className="form-submit-row">
              <button
                className={`form-submit-btn edit-btn ${loading ? 'loading' : ''} ${success ? 'success' : ''}`}
                onClick={updateBlog}
                disabled={loading || success}
                id="update-blog-btn"
              >
                {success ? (
                  <><FiCheck /> Updated!</>
                ) : loading ? (
                  <><span className="btn-spinner" /> Saving...</>
                ) : (
                  <><FiSave /> Save Changes</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default EditBlog;