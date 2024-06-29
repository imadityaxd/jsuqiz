import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const toggleNavbar = () => {
    setOpenMenu((prev) => !prev);
  };

  let menuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center flex-shrink-0">
            <img src={logo} alt="logo" className="h-10 w-10 mr-2" />
            <span className="text-xl tracking-tight">JS Quiz</span>
          </NavLink>
          <ul className="hidden sm:flex ml-14 space-x-12 text-lg">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-orange-500" : "text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/playquiz"
                className={({ isActive }) =>
                  isActive ? "text-orange-500" : "text-white"
                }
              >
                Play Quiz
              </NavLink>
            </li>
            <li>
              {isAuthenticated && (
                <NavLink
                  to="/quizform"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500" : "text-white"
                  }
                >
                  Add Quiz
                </NavLink>
              )}
            </li>
          </ul>

          <div className="hidden sm:flex justify-center space-x-12 items-center">
            {isAuthenticated ? (
              <NavLink
                to="/dashboard"
                className="py-2 px-1 ml-2 border rounded-md"
              >
                Dashboard
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
              >
                Admin Login
              </NavLink>
            )}
          </div>

          <div className="sm:hidden flex flex-col justify-end">
            <button onClick={toggleNavbar} className="text-white">
              {openMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center transform transition-transform duration-300 ease-in-out ${
          openMenu ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <button
          onClick={toggleNavbar}
          className="absolute top-4 right-4 text-white"
        >
          <X className="w-6 h-6" />
        </button>
        <ul className="">
          <li className="py-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "text-white"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="py-4">
            <NavLink
              to="/playquiz"
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "text-white"
              }
            >
              Play Quiz
            </NavLink>
          </li>
          <li className="py-4">
            {isAuthenticated && (
              <NavLink
                to="/quizform"
                className={({ isActive }) =>
                  isActive ? "text-orange-500" : "text-white"
                }
              >
                Add Quiz
              </NavLink>
            )}
          </li>
        </ul>
        <div className="flex space-x-6">
          {isAuthenticated ? (
            <NavLink to="/dashboard" className="py-2 px-3 rounded-md">
              Dashboard
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
            >
              Admin Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
