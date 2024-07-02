import express from "express"; 
import router from "./router/quizRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

const app = express();

dotenv.config({ path: "./.env" });

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/quiz", router);

export { app }; 
