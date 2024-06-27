import express from "express"; //importing express
import router from "./router/quizRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

const app = express(); //getting the returned value by calling express

dotenv.config({ path: "./.env" });

console.log("ORIGIN: ", process.env.CORS_ORIGIN);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
//route declaration
app.use("/api/quiz", router);

export { app }; //exporting app so that we can import app in server.js
