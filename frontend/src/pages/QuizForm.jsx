// src/QuizForm.js
import { useState } from "react";
import "./QuizForm.css";

export const QuizForm = () => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      console.log(response);
    } catch (error) {
      console.log(error || "something went wrong in post request");
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question </label>
          <input
            type="text"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div>
          <label>Option 1 </label>
          <input
            type="text"
            name="option1"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          />
        </div>
        <div>
          <label>Option 2 </label>
          <input
            type="text"
            name="option2"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
          />
        </div>
        <div>
          <label>Option 3 </label>
          <input
            type="text"
            name="option3"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
          />
        </div>
        <div>
          <label>Option 4 </label>
          <input
            type="text"
            name="option4"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
          />
        </div>
        <div>
          <label>Answer</label>
          <input
            type="text"
            name="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
};
