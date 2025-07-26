 
import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    const token = localStorage.getItem("helmer_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        setUser(null);
      }
    }
  }, []);

 
  const login = (token) => {
    localStorage.setItem("helmer_token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

 
  const logout = () => {
    localStorage.removeItem("helmer_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
