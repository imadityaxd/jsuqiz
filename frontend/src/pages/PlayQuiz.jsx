import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const PlayQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [wrongGuesses, setWrongGuesses] = useState([]);

  const nextBtn = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset selected option
      setIsCorrect(null); // Reset correctness state
      setWrongGuesses([]); // Reset wrong guesses
    } else {
      toast.success("Quiz is completed!", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
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
      toast.success("Congrats! Your answer is correct.");
      setIsCorrect(true);
    } else {
      toast.error("Wrong answer. Please try again.");
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

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg sm:max-w-lg w-full border border-orange-700 shadow-orange-400">
        <h2 className="text-2xl font-bold mb-4 overflow-hidden">
          Q{currentQuestionIndex + 1}. {currentQuestion.question}
        </h2>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option, currentQuestion)}
              className={`w-full py-2 px-4 rounded-lg transition-colors ${
                selectedOption === option
                  ? isCorrect
                    ? "bg-green-500 text-white animate-correct" // Lighter green for correct answer
                    : "bg-red-500 text-white animate-wrong" // Lighter red for wrong answer
                  : wrongGuesses.includes(option)
                  ? "bg-red-500 text-white" // Keep wrong guesses red
                  : "bg-blue-500 text-white hover:bg-blue-600" // Soft blue for unselected options
              }`}
              disabled={isCorrect && selectedOption !== option} // Disable all buttons after selecting the correct one
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
