import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ProtectiveRoutes({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const restrictedPaths = ["/login", "/signup"];
  const location = useLocation();
  if (!isAuthenticated && location.pathname == "/dashboard") {
    return <Navigate to="/login" />;
  }
  if (isAuthenticated && restrictedPaths.includes(location.pathname)) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}
