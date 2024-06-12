import dotenv from "dotenv";
import { app } from "./app.js";
import { dbConnect } from "./database/connectDb.js";
import router from "./router/quizRouter.js";


dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000; //getting data from .env file


//Mount the Router: To use the router in your main Express appm you can "mount" it at a specific URL prefix
app.use("/api/quiz", router);

//if the databse get connected successfully than the server will start running at defined PORT
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`App running successfully at port ${PORT}`);
  });
});
