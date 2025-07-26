import { Quiz } from "../quizModel/quizModel.js";

const home = async (req, res) => {
  try {
    const data = await Quiz.find();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};


const quiz = async (req, res) => {
  try {
    const { question, options, answer } = req.body;
    const quizCreated = await Quiz.create({ question, options, answer });


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
    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export { home, quiz, deleteQuiz };
