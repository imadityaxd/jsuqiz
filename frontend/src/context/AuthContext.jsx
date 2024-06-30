/* eslint-disable react/prop-types */
// src/context/AuthContext.js

import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });

  useEffect(() => {
    if (cookies.token) {
      console.log("cookie value in token:", cookies.token);
      setIsAuthenticated(true);
    } else {
      console.log("No token found in cookie");
      setIsAuthenticated(false);
    }
    console.log("isAuthenticated:", isAuthenticated);
  }, [cookies, isAuthenticated]);

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);

  const logout = () => {
    console.log("Removing token");
    removeCookie("token", { path: "/" });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, logout, username, setUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};
