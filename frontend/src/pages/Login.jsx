import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../components/Hooks/UserContext";
import { FiMail, FiLock, FiLogIn, FiZap, FiArrowRight } from "react-icons/fi";
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
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
      {/* Background orbs */}
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />

      <div className="auth-wrapper">
        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-brand-icon"><FiZap /></div>
          <span className="auth-brand-text">NEXUS<span className="brand-accent">BLOG</span></span>
        </div>

        <div className="auth-card">
          {/* Scan line animation */}
          <div className="scan-line" aria-hidden="true" />

          <div className="auth-card-inner">
            <div className="auth-header">
              <div className="auth-icon-ring">
                <FiLogIn />
              </div>
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Sign in to your account to continue</p>
            </div>

            {error && (
              <div className="auth-error">
                <span>⚠ {error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="auth-form">
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
                    id="login-email"
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
                    id="login-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`auth-submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
                id="login-submit"
              >
                {loading ? (
                  <span className="btn-spinner" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <FiArrowRight />
                  </>
                )}
              </button>
            </form>

            <p className="auth-switch">
              Don't have an account?{" "}
              <Link to="/signup" className="auth-switch-link">Create Account</Link>
            </p>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="auth-decoration" aria-hidden="true">
          <div className="deco-circle deco-1" />
          <div className="deco-circle deco-2" />
          <div className="deco-line deco-line-1" />
          <div className="deco-line deco-line-2" />
        </div>
      </div>
    </div>
  );
}

export default Login;