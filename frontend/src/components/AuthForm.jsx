import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userSchema } from "../validations/userSchema";
import axios from "axios";

import { showToast } from "../utils/toastUtils";
import { LoaderCircle } from "lucide-react";

import { AuthContext } from "../context/AuthContext";

export default function AuthForm(prop) {
  const { setUsername } = useContext(AuthContext);

  const navigate = useNavigate();
 
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });


  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = userSchema.parse(userData);
  
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/quiz/${prop.api}`,
        validatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const result = response.data;

      showToast(result.message, "success");
 
      setUserData({
        username: "",
        password: "",
      });

   
   
      if (prop.api === "register") {
        navigate("/login"); 
      } else if (prop.api === "login") {
        setUsername(result.user.username);
        console.log("ABout to navigate: ");
        navigate("/dashboard");
        console.log("Navigated");
      }
    
    } catch (error) {
      const zodError = error?.errors?.length > 0 && error.errors[0].message;
      showToast(
        error.response?.data?.message ||
          zodError ||
          "error in fetching post api",
        "error"
      );

      console.log(
        error.response?.data?.message ||
          zodError ||
          "Something went wrong in post request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 border border-orange-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
      <h1 className="text-4xl font-bold text-center text-orange-500">
        Admin {prop.formName}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="relative my-4">
          <input
            type="text"
            id="username"
            name="username"
            className="block sm:w-72 w-52 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:text-white focus:border-orange-600 peer"
            placeholder=""
            onChange={handleChange}
            value={userData.username}
          />
          <label
            htmlFor="username"
            className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 text-gray-400 peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500"
          >
            Username
          </label>
        </div>
        <div className="relative my-4">
          <input
            type="password"
            name="password"
            id="password"
            className="block sm:w-72 w-52 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:text-white focus:border-orange-600 peer"
            placeholder=""
            onChange={handleChange}
            value={userData.password}
          />
          <label
            htmlFor="password"
            className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 text-gray-400 peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500"
          >
            Your Password
          </label>
        </div>
        <button
          className={`py-3 rounded-md w-full ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-orange-800 hover:bg-orange-800"
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <LoaderCircle
                className="animate-spin text-white mr-2"
                size={24}
              />
              <span>Loading...</span>
            </div>
          ) : (
            prop.formName
          )}
        </button>
        <p className="mt-6">
          Don`t have an account ?{" "}
          <NavLink to={prop.goTo} className="text-orange-500">
            {prop.navigate}
          </NavLink>
        </p>
      </form>
    </div>
  );
}
