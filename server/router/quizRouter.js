import express from "express";

const router = express.Router();
import { home, quiz, deleteQuiz } from "../controller/quizController.js";
import { loginUser, registerUser } from "../controller/authController.js";


router.route("/").get(home);
router.route("/add-quiz").post(quiz);
router.route("/delete-quiz/:id").delete(deleteQuiz);

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
