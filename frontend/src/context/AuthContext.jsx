/* eslint-disable react/prop-types */
// src/context/AuthContext.js

import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies, , removeCookie] = useCookies(["token"]);

  useEffect(() => {
    console.log("Current cookies:", cookies);
    if (cookies.token) {
      console.log("cookie value in token:", cookies.token);
      setIsAuthenticated(true);
    } else {
      console.log("No token found in cookie");
      setIsAuthenticated(false);
    }
  }, [cookies]);

  //   const login = (token) => {
  //     console.log("Setting token:", token);
  //     // setCookie("token", token, { path: "/", sameSite: "Strict" });
  //     setIsAuthenticated(true);
  //   };

  const logout = () => {
    console.log("Removing token");
    removeCookie("token", { path: "/" });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
