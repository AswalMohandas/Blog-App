import React from "react";
import Navigation from "../components/Navbar";
import Footer from "../components/Footer";
import { useUser } from "../components/Hooks/UserContext";
import { FiUser, FiMail, FiShield, FiZap } from "react-icons/fi";
import './Profile.css';

function Profile() {
  const { user } = useUser();

  if (!user) {
    return (
      <>
        <Navigation />
        <div className="profile-loading">
          <div className="profile-spinner" />
        </div>
      </>
    );
  }

  return (
    <div className="page-wrapper">
      <Navigation />
      <div className="profile-page">
        <div className="profile-orb-1" />
        <div className="profile-orb-2" />

        <div className="profile-container">
          {/* Avatar */}
          <div className="profile-avatar-section">
            <div className="profile-avatar-ring">
              <div className="profile-avatar-inner">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="profile-avatar-glow" />
          </div>

          {/* Card */}
          <div className="profile-card">
            <div className="profile-card-scan" />

            <div className="profile-card-header">
              <div className="profile-brand-tag">
                <FiZap /> NEXUS BLOG
              </div>
              <h1 className="profile-name">{user.name}</h1>
              {user.role && (
                <span className="profile-role-badge">
                  <FiShield /> {user.role}
                </span>
              )}
            </div>

            <div className="profile-divider" />

            <div className="profile-info-grid">
              <div className="profile-info-item">
                <div className="info-icon"><FiUser /></div>
                <div className="info-content">
                  <label>Full Name</label>
                  <span>{user.name}</span>
                </div>
              </div>
              <div className="profile-info-item">
                <div className="info-icon"><FiMail /></div>
                <div className="info-content">
                  <label>Email Address</label>
                  <span>{user.email}</span>
                </div>
              </div>
              {user.role && (
                <div className="profile-info-item">
                  <div className="info-icon"><FiShield /></div>
                  <div className="info-content">
                    <label>Account Role</label>
                    <span className="role-highlight">{user.role}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Profile;