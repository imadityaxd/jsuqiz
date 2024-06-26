import express from "express";

const router = express.Router();
import { home, quiz } from "../controller/quizController.js";
import { registerUser } from "../controller/signInController.js";

router.route("/").get(home);
router.route("/add-quiz").post(quiz);

router.route("/register").post(registerUser);

export default router;
