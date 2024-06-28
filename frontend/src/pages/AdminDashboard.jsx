import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  function logoutHandler() {
    logout();
    navigate('/')
  }
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center">welcome to admin Dashboard.</h1>
      <button
        className="mt-12 bg-orange-500 px-4 py-3 rounded-lg font-semibold hover:bg-orange-600"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
}
