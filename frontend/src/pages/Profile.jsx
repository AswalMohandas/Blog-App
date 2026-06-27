import React from "react";
import { useUser } from "../components/Hooks/UserContext";

function Profile() {
  const { user } = useUser();

  return (
    <div className="container mt-5">
      <h2>My Profile</h2>

      <div className="card p-4">
        <h4>Name: {user?.name}</h4>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
}

export default Profile;