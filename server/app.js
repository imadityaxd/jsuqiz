import express from "express"; //importing express
import router from "./router/quizRouter.js";

const app = express(); //getting the returned value by calling express

app.use(express.json());
//route declaration
app.use("/api/quiz", router);

export { app }; //exporting app so that we can import app in server.js
