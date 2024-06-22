import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleNavbar = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop:blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img src={logo} alt="logo" className="h-10 w-10 mr-2" />
            <span className="text-xl tracking-tight">JS Quiz</span>
          </div>
          <ul className="hidden md:flex ml-14 space-x-12">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/playquiz">Play Quiz</NavLink>
            </li>
            <li className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md">
              <NavLink to="/quizform">Add Quiz</NavLink>
            </li>
          </ul>
          <div className="md:hidden flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {openMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {openMenu && (
        <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center md:hidden">
          <ul className="">
            <li className="py-4">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="py-4">
              <NavLink to="/playquiz">Play Quiz</NavLink>
            </li>
            <li className="py-4">
              <NavLink
                to="/quizform"
                className="bg-gradient-to-r from-orange-500 to-orange-800 px-3 py-2 rounded-md"
              >
                Add Quiz
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
