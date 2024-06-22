// src/QuizForm.js
import { useState } from "react";
import toast from "react-hot-toast";

export const QuizForm = () => {
  //storing all the questions data in a single object with useState
  const [questionData, setQuestionData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });

  //This function will run everyTime we insert some characters and update it in questionData object.
  function handleChange(e) {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  }

  //This function will run when we will send questions data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();  //prevent the default behaviour of form so that the form will not refresh automatically

    const { question, option1, option2, option3, option4, answer } =
      questionData;  //extracting the fields from questionData by destructuring it.

    //setting all the fields in a way that we have set in backend so that the backend api will accept this data.
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

    //using react-hot-toast for toast message
      toast.success(result.msg, {
        style: {
          minWidth: "300px",
          minHeight: "50px",
          fontSize: "18px",
        },
      });

      // Reset all the  fields
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
      toast.error(error || "something went wrong in adding toast");
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
            value={questionData.question}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Option 1 </label>
          <input
            type="text"
            name="option1"
            value={questionData.option1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Option 2 </label>
          <input
            type="text"
            name="option2"
            value={questionData.option2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Option 3 </label>
          <input
            type="text"
            name="option3"
            value={questionData.option3}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Option 4 </label>
          <input
            type="text"
            name="option4"
            value={questionData.option4}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Answer</label>
          <input
            type="text"
            name="answer"
            value={questionData.answer}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
};
