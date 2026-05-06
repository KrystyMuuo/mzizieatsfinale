import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const data = JSON.parse(saved);
      setUser(data);
      setIsAuthenticated(true);
      setMessage(`Welcome ${data.username}`);
      setTimeout(() => setMessage(""), 3000);
    }
  }, []);

  const login = (data) => {
    setUser(data);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(data));
    setMessage(`Welcome ${data.username}`);
    setTimeout(() => setMessage(""), 3000);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    setMessage("Logged out successfully");
    setTimeout(() => setMessage(""), 2500);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, message }}>
      {children}
    </AuthContext.Provider>
  );
};
