import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState([]);

  console.log("user::",user);
  
  // Signup
  const signup = async (name, email, password) => {
    const response = await axios.post(
      "/api/auth/signup",
      {
        name,
        email,
        password,
      }
    );

    return response.data;
  };

  // Login
  const login = async (email, password) => {
    const response = await axios.post(
      "/api/auth/login",
      {
        email,
        password,
      }
    );
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

export default UserContext;