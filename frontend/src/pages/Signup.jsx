import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../components/Hooks/UserContext';
import { FiMail, FiLock, FiUser, FiUserPlus, FiZap, FiArrowRight } from 'react-icons/fi';
import './Auth.css';

function Signup() {
  const navigate = useNavigate();
  const { signup } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signup(name, email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || "Server error or network problem"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />

      <div className="auth-wrapper">
        <div className="auth-brand">
          <div className="auth-brand-icon"><FiZap /></div>
          <span className="auth-brand-text">NEXUS<span className="brand-accent">BLOG</span></span>
        </div>

        <div className="auth-card">
          <div className="scan-line" aria-hidden="true" />

          <div className="auth-card-inner">
            <div className="auth-header">
              <div className="auth-icon-ring">
                <FiUserPlus />
              </div>
              <h1 className="auth-title">Join NEXUS</h1>
              <p className="auth-subtitle">Create your account and start writing</p>
            </div>

            {error && (
              <div className="auth-error">
                <span>⚠ {error}</span>
              </div>
            )}

            <form onSubmit={handleSignup} className="auth-form">
              <div className="input-group-neo">
                <label className="input-label">Full Name</label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    className="neo-input"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    id="signup-name"
                  />
                </div>
              </div>

              <div className="input-group-neo">
                <label className="input-label">Email Address</label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    className="neo-input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    id="signup-email"
                  />
                </div>
              </div>

              <div className="input-group-neo">
                <label className="input-label">Password</label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" />
                  <input
                    type="password"
                    className="neo-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    id="signup-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`auth-submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
                id="signup-submit"
              >
                {loading ? (
                  <span className="btn-spinner" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <FiArrowRight />
                  </>
                )}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?{" "}
              <Link to="/login" className="auth-switch-link">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;