import React, { useEffect, useState } from "react";
import api from "../MainUrl";
import Navigation from "../components/Navbar";
import Footer from "../components/Footer";
import { FiUsers, FiUser, FiMail, FiShield } from "react-icons/fi";
import './Allusers.css';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/api/users/all-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navigation />
      <div className="users-page">
        <div className="users-orb-1" />
        <div className="users-orb-2" />

        <div className="users-container">
          {/* Header */}
          <div className="users-header">
            <div className="users-header-icon"><FiUsers /></div>
            <h1 className="users-title">All Users</h1>
            <p className="users-subtitle">{users.length} registered accounts</p>
          </div>

          <div className="users-neon-line" />

          {/* Table */}
          {loading ? (
            <div className="users-loading">
              <div className="users-spinner" />
              <p>Loading users...</p>
            </div>
          ) : (
            <div className="users-table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th><FiUser /> Name</th>
                    <th><FiMail /> Email</th>
                    <th><FiShield /> Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id} style={{ animationDelay: `${index * 0.05}s` }} className="user-row">
                      <td className="row-index">{String(index + 1).padStart(2, '0')}</td>
                      <td className="row-name">
                        <div className="user-avatar-mini">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        {user.name}
                      </td>
                      <td className="row-email">{user.email}</td>
                      <td>
                        <span className={`role-chip ${user.role === 'admin' ? 'admin' : 'user'}`}>
                          {user.role || 'user'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default AllUsers;