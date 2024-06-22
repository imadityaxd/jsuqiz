import { NavLink } from "react-router-dom";
import quiz1 from "../assets/quiz1.png";
import quiz2 from "../assets/quiz2.png";
import FeaturesSection from "../components/Features";

export const Home = () => {
  return (
    <div className="max-w-7xl mx-auto pt-20 px-6">
      <div className="flex flex-col items-center mt-6 lg:mt-20">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
          Learn JavaScript
          <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
            {" "}
            With Quiz
          </span>
        </h1>
        <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
          Polish your javaScript knowledge by playing quizzes.
        </p>
        <button className="flex justify-center my-10">
          <NavLink
            to="/playquiz"
            className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md"
          >
            Play The Quiz
          </NavLink>
        </button>
        <div className="flex md:flex-row flex-col mt-10 justify-center items-center">
          <img
            className="rounded-lg w-[22rem] h-[15rem] border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
            src={quiz1}
            alt="img"
          />
          <img
            className="rounded-lg w-[22rem] h-[15rem] border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
            src={quiz2}
            alt="img"
          />
        </div>
      </div>
      <FeaturesSection />
    </div>
  );
};
