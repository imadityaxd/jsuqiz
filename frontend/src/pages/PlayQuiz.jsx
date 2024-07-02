import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { LoaderCircle } from "lucide-react";
import { showToast } from "../utils/toastUtils";
import Result from "../components/Result";

const PlayQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const nextBtn = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setWrongGuesses([]);
    } else {
      showToast("Quiz is completed!", "success");
      setQuizCompleted(true);
    }
  }, [currentQuestionIndex, questions.length]);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/quiz");
      setQuestions(response.data);
    } catch (error) {
      setError("Error fetching questions. Please try again later.");
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleOptionClick = (option, currentQuestion) => {
    if (selectedOption === currentQuestion.answer) {
      return;
    }

    setSelectedOption(option);

    if (option === currentQuestion.answer) {
      showToast("Congrats! Your answer is correct.", "success");
      setIsCorrect(true);
    } else {
      showToast("Wrong answer. Please try again.", "error");
      setIsCorrect(false);
      setWrongGuesses((prev) => [...prev, option]);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <LoaderCircle className="animate-spin text-orange-500" size={64} />
        <p className="text-xl text-gray-400">Fetching data...</p>
      </div>
    );
  }
  if (questions.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <p className="text-xl text-gray-400 p-6 text-center">
          No Data Quiz Found. please Login as Admin and as quiz
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <p className="text-xl text-red-500 text-center px-6">{error}</p>
        <button
          onClick={fetchQuestions}
          className="mt-4 bg-orange-600 text-white py-2 px-10 rounded-lg hover:bg-orange-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (quizCompleted) {
    return <Result questions={questions} />;
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-custom-bg bg-cover">
      <h2>
        {currentQuestionIndex + 1} of {questions.length}
      </h2>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg sm:max-w-lg w-full border border-orange-700 shadow-orange-400">
        <h2 className="text-2xl font-bold mb-4 overflow-hidden">
          Q{currentQuestionIndex + 1}. {currentQuestion?.question}
        </h2>
        <div className="space-y-4">
          {currentQuestion?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option, currentQuestion)}
              className={`relative w-full py-2 px-4 rounded-lg transition-colors ${
                selectedOption === option
                  ? isCorrect
                    ? "bg-green-500 text-white animate-correct"
                    : "bg-red-500 text-white animate-wrong"
                  : wrongGuesses.includes(option)
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              } ${
                isCorrect && selectedOption !== option
                  ? "cursor-not-allowed"
                  : ""
              }`}
              disabled={isCorrect && selectedOption !== option} 
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="text-orange-600 font-bold py-2 px-4 border-2 rounded-lg border-orange-700 shadow-orange-400 mt-6"
            onClick={nextBtn}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayQuiz;
