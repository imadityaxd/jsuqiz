import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { showToast } from "../utils/toastUtils";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const { logout, username } = useContext(AuthContext);
  const ownersPassword = "cykoravish";
  console.log("username:", username);
  function logoutHandler() {
    logout();
    showToast("Logout successfully", "success");
    Navigate("/");
  }

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/quiz"); // Replace with your API endpoint
      setQuizzes(response.data);
      setTotalQuizzes(response.data.length);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const deleteQuiz = async (quizId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/quiz/delete-quiz/${quizId}`
      ); // Replace with your API endpoint
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
      setTotalQuizzes(totalQuizzes - 1);
      showToast("Question deleted", "success");
    } catch (error) {
      console.error("Error deleting quiz:", error);
      showToast("error in deleting question", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-orange-500 mb-4">
        {username}&#39;s Dashboard
      </h1>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-white">Total Questions</h2>
        <p className="text-2xl text-orange-500">{totalQuizzes}</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-white mb-4">Manage Questions</h2>
        <div>
          <input
            type="text"
            placeholder="Password"
            name="password"
            className="px-2 py-2 mb-3 bg-gray-700 text-white"
          />
          <button className="bg-orange-500 hover:bg-orange-600">Verify</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-700 text-left">Question</th>
                <th className="py-2 px-4 bg-gray-700 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, index) => (
                <tr key={quiz._id}>
                  <td className="py-2 px-4 border-t border-gray-700">
                    <span className="font-bold text-orange-500">
                      {index + 1}.{" "}
                    </span>
                    {quiz.question}
                  </td>
                  <td className="py-2 px-4 border-t border-gray-700">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-lg"
                      onClick={() => deleteQuiz(quiz._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="mt-12 bg-orange-500 px-4 py-3 rounded-lg font-semibold hover:bg-orange-600"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
