import { NavLink } from "react-router-dom";

export default function AuthForm(prop) {
  return (
    <div>
      <div className="bg-slate-800 border border-orange-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
        <h1 className="text-4xl font-bold text-center">{prop.formName}</h1>
        <form>
          <div className="relative my-4">
            <input
              type="text"
              id="username"
              className="block sm:w-72 w-52 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:text-white focus:border-orange-600 peer"
              placeholder=""
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
              id="password"
              className="block sm:w-72 w-52 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:text-white focus:border-orange-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 text-gray-400 peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500"
            >
              Your Password
            </label>
          </div>
          <button
            type="submit"
            className="w-full text-[18px] mt-6 rounded bg-orange-500 py-2 hover:bg-orange-600 transition-colors duration-300 mb-6"
          >
            {prop.formName}
          </button>
          <p>Already {prop.formName} ? <NavLink to={prop.goTo} className="text-orange-500">{prop.navigate}</NavLink></p>
        </form>
      </div>
    </div>
  );
}
