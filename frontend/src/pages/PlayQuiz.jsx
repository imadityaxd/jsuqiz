import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { LoaderCircle } from 'lucide-react';

const PlayQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Fetch questions from the API
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quiz");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionClick = (option, currentQuestion) => {
    // Handle the option click (e.g., check if it's correct, move to the next question, etc.)
    console.log(`Selected option: ${option} Answer: ${currentQuestion.answer}`);
    if (option === currentQuestion.answer) {
      toast.success("congrats! your answer is correct");
    } else {
      toast.error("wrong answer");
    }
  };

  function nextBtn() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      toast.success('Quiz is completed', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    }
  }

  if (!questions.length) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <LoaderCircle className="animate-spin text-orange-500" size={64} />
      <p className="text-xl text-gray-400">Fetching data...</p>
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
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
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
