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

    res.status(201).json({
      msg: "quiz upload successful",
      quizId: quizCreated._id.toString(),
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json("internal server error");
  }
};

export { home, quiz };
