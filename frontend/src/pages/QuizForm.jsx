// src/QuizForm.js
import axios from "axios";
import { useState } from "react";

import { showToast } from "../utils/toastUtils";
import { LoaderCircle } from "lucide-react";
import { questionsSchema } from "../validations/questionsSchema";

export const QuizForm = () => {
  const [loading, setLoading] = useState(false);
  const [questionData, setQuestionData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });
  const [verifyPassword, setVerifyPassword] = useState("");
  const [ownersVerifiedUser, setOwnersVerifiedUser] = useState(false);

  function verifyUser() {
    if (verifyPassword === "cykoravish" || verifyPassword === "xdcoder") {
      setOwnersVerifiedUser(true);
      showToast("you can add question now", "success");
    } else {
      showToast(
        "incorrect password. Please get the password from the owner. Owners instagram: @xdcoder.xyz or @cykoravish",
        "success"
      );
    }
  }

  function handleChange(e) {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { question, option1, option2, option3, option4, answer } =
      questionData;

    const quizData = {
      question: question,
      options: [option1, option2, option3, option4],
      answer,
    };

    try {
      const validatedData = questionsSchema.parse(quizData);
      console.log("validated data: ", validatedData);

      if (ownersVerifiedUser) {
        const response = await axios.post(
          "http://localhost:5000/api/quiz/add-quiz",
          validatedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = response.data;
        showToast(result.msg, "success");
        setQuestionData({
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
        });
        console.log(result);
      } else {
        showToast(
          "you need to verify before adding questions to Quiz. Get the password from the owner. Owners instagram: @xdcoder.xyz or @cykoravish",
          "error"
        );
      }
    } catch (error) {
      const zodError = error?.errors?.length > 0 && error.errors[0].message;
      showToast(
        error.response?.data?.message ||
          zodError ||
          "error in fetchig post api",
        "error"
      );

      console.log(
        error.response?.data?.message ||
          zodError ||
          "Something went wrong in post request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 max-w-lg mx-auto mt-10 mb-10">
      <form
        className="space-y-4 border border-orange-700 shadow-orange-400 p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        {!ownersVerifiedUser && (
          <div className="mb-3 flex flex-wrap">
            <input
              type="text"
              placeholder="Password"
              name="password"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              className="px-2 py-2 bg-gray-700 text-white w-32"
            />
            <button
              className="bg-orange-500 hover:bg-orange-600 px-2 py-2"
              onClick={verifyUser}
            >
              Verify
            </button>
          </div>
        )}
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
          className={`py-3 rounded-md w-full ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-orange-800 hover:bg-orange-800"
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <LoaderCircle
                className="animate-spin text-white mr-2"
                size={24}
              />
              <span>Loading...</span>
            </div>
          ) : (
            "Add Question"
          )}
        </button>
      </form>
    </section>
  );
};
