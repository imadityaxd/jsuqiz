import express from "express";

const router = express.Router();
import { home, quiz } from "../controller/quizController.js";
import { loginUser, registerUser } from "../controller/authController.js";

router.route("/").get(home);
router.route("/add-quiz").post(quiz);

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
