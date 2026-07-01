import React from 'react';
import { Link } from 'react-router-dom';
import { FiZap, FiGithub, FiTwitter, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import './Footer.css';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="nexus-footer">
      <div className="footer-glow-line" />
      
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-section">
            <Link to="/" className="footer-logo">
              <div className="logo-icon">
                <FiZap />
              </div>
              <span className="logo-text">
                NEX<span className="logo-accent">US</span>
              </span>
              <span className="logo-tag">BLOG</span>
            </Link>
            <p className="footer-desc">
              A futuristic space for sharing ground-breaking ideas, modern tech trends, and creative thoughts. Built for the next generation of readers.
            </p>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <FiGithub />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-section">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/create-blog">Create Article</Link></li>
              <li><Link to="/my-blogs">My Blogs</Link></li>
              <li><Link to="/profile">My Profile</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-links-section">
            <h4 className="footer-title">Trending Categories</h4>
            <ul className="footer-links">
              <li><Link to="/?category=Technology">Technology</Link></li>
              <li><Link to="/?category=Science">Science</Link></li>
              <li><Link to="/?category=Design">Design</Link></li>
              <li><Link to="/?category=Business">Business</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter-section">
            <h4 className="footer-title">Newsletter</h4>
            <p className="newsletter-text">Subscribe to receive the latest cyber updates directly in your inbox.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <div className="newsletter-input-wrapper">
                <FiMail className="newsletter-mail-icon" />
                <input type="email" placeholder="Enter your email" className="newsletter-input" required />
                <button type="submit" className="newsletter-btn">
                  <span>Join</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} NEXUS BLOG. All rights reserved.</p>
          <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
