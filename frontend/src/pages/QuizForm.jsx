// src/QuizForm.js
import { useState } from "react";
import "./QuizForm.css";

export const QuizForm = () => {
  const [quizData, setQuizData] = useState({
    title: "",
    questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }],
  });

  const handleChange = (e, questionIndex, optionIndex) => {
    const { name, value } = e.target;
    if (name === "title") {
      setQuizData({ ...quizData, title: value });
    } else if (name === "question") {
      const updatedQuestions = quizData.questions.map((q, index) =>
        index === questionIndex ? { ...q, question: value } : q
      );
      setQuizData({ ...quizData, questions: updatedQuestions });
    } else if (name.startsWith("option")) {
      const updatedQuestions = quizData.questions.map((q, index) =>
        index === questionIndex
          ? {
              ...q,
              options: q.options.map((opt, optIndex) =>
                optIndex === optionIndex ? value : opt
              ),
            }
          : q
      );
      setQuizData({ ...quizData, questions: updatedQuestions });
    } else if (name === "correctAnswer") {
      const updatedQuestions = quizData.questions.map((q, index) =>
        index === questionIndex ? { ...q, correctAnswer: value } : q
      );
      setQuizData({ ...quizData, questions: updatedQuestions });
    }
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { question: "", options: ["", "", "", ""], correctAnswer: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    });
    const result = await response.json();
    console.log("Quiz submitted", result);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Quiz Title:
            <input
              type="text"
              name="title"
              value={quizData.title}
              onChange={handleChange}
            />
          </label>
        </div>
        {quizData.questions.map((q, qIndex) => (
          <div key={qIndex}>
            <label>
              Question:
              <input
                type="text"
                name="question"
                value={q.question}
                onChange={(e) => handleChange(e, qIndex)}
              />
            </label>
            {q.options.map((opt, optIndex) => (
              <div key={optIndex}>
                <label>
                  Option {optIndex + 1}:
                  <input
                    type="text"
                    name={`option-${optIndex}`}
                    value={opt}
                    onChange={(e) => handleChange(e, qIndex, optIndex)}
                  />
                </label>
              </div>
            ))}
            <label>
              Correct Answer:
              <input
                type="text"
                name="correctAnswer"
                value={q.correctAnswer}
                onChange={(e) => handleChange(e, qIndex)}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
        <button type="submit">Submit Quiz</button>
      </form>
    </section>
  );
};
