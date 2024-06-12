import express from "express";

const router = express.Router();
import {home, quiz} from "../controller/quizController.js";



router.route("/").get(home);
router.route("/quiz").post(quiz);

export default router;