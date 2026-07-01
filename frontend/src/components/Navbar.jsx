import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from './Hooks/UserContext';
import { FiHome, FiEdit3, FiUser, FiBookOpen, FiUsers, FiLogOut, FiLogIn, FiUserPlus, FiMenu, FiX, FiZap } from 'react-icons/fi';
import './Navbar.css';

function Navigation() {
  const { user, logout } = useUser();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home', icon: <FiHome /> },
  ];

  return (
    <nav className={`nexus-navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Animated top border */}
      <div className="navbar-glow-line" />

      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <FiZap />
          </div>
          <span className="logo-text">
            NEX<span className="logo-accent">US</span>
          </span>
          <span className="logo-tag">BLOG</span>
        </Link>

        {/* Center Nav Links */}
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              <span className="nav-link-icon">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}

          {/* Create Blog always visible */}
          <Link
            to="/create-blog"
            className={`nav-link ${location.pathname === '/create-blog' ? 'active' : ''}`}
          >
            <span className="nav-link-icon"><FiEdit3 /></span>
            <span>Create</span>
          </Link>

          {/* Mobile: auth links */}
          {!user && (
            <div className="mobile-auth-links">
              <Link to="/login" className="nav-link">
                <span className="nav-link-icon"><FiLogIn /></span>
                <span>Login</span>
              </Link>
              <Link to="/signup" className="nav-link">
                <span className="nav-link-icon"><FiUserPlus /></span>
                <span>Signup</span>
              </Link>
            </div>
          )}
        </div>

        {/* Right side actions */}
        <div className="navbar-actions">
          {user ? (
            <div className="user-menu">
              <button
                className="user-avatar-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="User menu"
              >
                <div className="avatar-ring">
                  <div className="avatar-inner">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </div>
                <span className="user-name-display">{user.name?.split(' ')[0]}</span>
                <div className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▾</div>
              </button>

              {dropdownOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="dropdown-name">{user.name}</div>
                      <div className="dropdown-email">{user.email}</div>
                    </div>
                  </div>
                  <div className="dropdown-divider" />
                  <Link to="/profile" className="dropdown-item">
                    <FiUser /> My Profile
                  </Link>
                  <Link to="/my-blogs" className="dropdown-item">
                    <FiBookOpen /> My Blogs
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/all-users" className="dropdown-item">
                      <FiUsers /> All Users
                    </Link>
                  )}
                  <div className="dropdown-divider" />
                  <button className="dropdown-item danger" onClick={logout}>
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-ghost">Login</Link>
              <Link to="/signup" className="btn-neon">Get Started</Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}
    </nav>
  );
}

export default Navigation;
