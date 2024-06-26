import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleNavbar = () => {
    setOpenMenu(!openMenu);
  };
  console.log("openMenu:", openMenu);

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
          <ul className="hidden lg:flex ml-14 space-x-12 text-lg">
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
              <NavLink
                to="/quizform"
                className={({ isActive }) =>
                  isActive ? "text-orange-500" : "text-white"
                }
              >
                Add Quiz
              </NavLink>
            </li>
          </ul>

          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a href="#" className="py-2 px-3 border rounded-md">
              Sign In
            </a>
            <a
              href="#"
              className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
            >
              Create an account
            </a>
          </div>

          <div className="lg:hidden flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {openMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {openMenu && (
        <div
          ref={menuRef}
          className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden"
        >
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
              <NavLink
                to="/quizform"
                className={({ isActive }) =>
                  isActive ? "text-orange-500" : "text-white"
                }
              >
                Add Quiz
              </NavLink>
            </li>
          </ul>
          <div className="flex space-x-6">
            <a href="#" className="py-2 px-3 border rounded-md">
              Sign In
            </a>
            <a
              href="#"
              className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
            >
              Create an account
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
