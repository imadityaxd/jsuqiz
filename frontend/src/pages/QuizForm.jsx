// src/QuizForm.js
import { useState } from "react";
import toast from "react-hot-toast";

export const QuizForm = () => {
  const [questionData, setQuestionData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });

  function handleChange(e) {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { question, option1, option2, option3, option4, answer } =
      questionData;

    const quizData = {
      question: question,
      options: [option1, option2, option3, option4],
      answer,
    };

    try {
      const response = await fetch("http://localhost:5000/api/quiz/add-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });
      const result = await response.json();

      toast.success(result.msg, {
        style: {
          minWidth: "300px",
          minHeight: "50px",
          fontSize: "18px",
        },
      });

      setQuestionData({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      });
      console.log(result);
    } catch (error) {
      toast.error(error.message || "Something went wrong in adding toast");
      console.log(error.message || "Something went wrong in post request");
    }
  };

  return (
    <section className="p-6 max-w-lg mx-auto mt-10 mb-10">
      <form className="space-y-4 border border-orange-700 shadow-orange-400 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <div>
          <label className="block text-orange-600 font-bold mb-2">
            Question
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-100"
            type="text"
            name="question"
            value={questionData.question}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-orange-600 font-bold mb-2">
            Option 1
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-100"
            type="text"
            name="option1"
            value={questionData.option1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-orange-600 font-bold mb-2">
            Option 2
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-100"
            type="text"
            name="option2"
            value={questionData.option2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-orange-600 font-bold mb-2">
            Option 3
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-100"
            type="text"
            name="option3"
            value={questionData.option3}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-orange-600 font-bold mb-2">
            Option 4
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-100"
            type="text"
            name="option4"
            value={questionData.option4}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-orange-600 font-bold mb-2">Answer</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-100"
            type="text"
            name="answer"
            value={questionData.answer}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 rounded-md w-full hover:bg-orange-800"
          type="submit"
        >
          Add Question
        </button>
      </form>
    </section>
  );
};
