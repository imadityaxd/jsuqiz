import { Quiz } from "../quizModel/quizModel.js";

//get request for getting quizzes
const home = async (req, res) => {
  try {
    const data = await Quiz.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

//upload logic

const quiz = async (req, res) => {
  try {
    const { question, options, answer } = req.body;
    console.log("test");
    const quizCreated = await Quiz.create({ question, options, answer });
    // console.log("new quiz: ", quizCreated);

    return res.status(201).json({
      msg: "quiz upload successful",
      quizId: quizCreated._id.toString(),
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    console.log("deleteQuiz: ", deleteQuiz);
    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export { home, quiz, deleteQuiz };
