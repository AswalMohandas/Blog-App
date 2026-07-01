import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navbar";
import Footer from "../components/Footer";
import { FiUpload, FiImage, FiType, FiUser, FiTag, FiFileText, FiCheck } from "react-icons/fi";
import './BlogForm.css';

function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSrc(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadBlog = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("author", author);
      formData.append("category", category);
      formData.append("src", src);

      await axios.post("http://localhost:5000/api/blogs/create-blog", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setSuccess(true);
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.log("Error:", error.response?.data);
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
            <div className="form-header-icon"><FiType /></div>
            <h1 className="form-header-title">Create Article</h1>
            <p className="form-header-sub">Share your story with the world</p>
          </div>

          <div className="blog-form-card">
            <div className="form-scan-line" />

            <div className="blog-form-grid">
              {/* Left: Fields */}
              <div className="form-fields">
                <div className="form-field">
                  <label className="form-label"><FiType /> Title</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your article title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="blog-title"
                  />
                </div>

                <div className="form-field">
                  <label className="form-label"><FiUser /> Author</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your name..."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    id="blog-author"
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
                    placeholder="Write your article content here..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={8}
                    id="blog-content"
                  />
                </div>
              </div>

              {/* Right: Image Upload */}
              <div className="form-image-section">
                <label className="form-label"><FiImage /> Cover Image</label>
                <label className="image-upload-zone" htmlFor="blog-image">
                  {preview ? (
                    <img src={preview} alt="Preview" className="image-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <FiUpload className="upload-icon" />
                      <p>Click to upload cover image</p>
                      <span>PNG, JPG, WEBP up to 10MB</span>
                    </div>
                  )}
                  <input
                    id="blog-image"
                    type="file"
                    accept="image/*"
                    className="file-input-hidden"
                    onChange={handleImageChange}
                  />
                </label>

                {preview && (
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => { setPreview(null); setSrc(null); }}
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="form-submit-row">
              <button
                className={`form-submit-btn ${loading ? 'loading' : ''} ${success ? 'success' : ''}`}
                onClick={uploadBlog}
                disabled={loading || success}
                id="publish-blog-btn"
              >
                {success ? (
                  <><FiCheck /> Published!</>
                ) : loading ? (
                  <><span className="btn-spinner" /> Publishing...</>
                ) : (
                  <><FiUpload /> Publish Article</>
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

export default CreateBlog;