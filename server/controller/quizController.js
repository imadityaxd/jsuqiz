import { Quiz } from "../quizModel/quizModel.js";

const home = async (req, res) => {
    try{
        res
        .status(200)
        .send('Welcome to quiz app by WebDevelopers.');

    } catch(error){
        console.log(error);
    }
};

//upload logic 

const quiz = async (req, res) => {
    try{
        console.log(req.body);
        const {question, options} = req.body;

        const quizCreated = 
        await Quiz.create({question, options });

        res
        .status(201)
        .json({
            msg: "quiz upload successful", 
            quizId: quizCreated._id.toString(),
         });

    } catch(error){
        res.status(500).json("internal server error");
    }
};

export { home, quiz };