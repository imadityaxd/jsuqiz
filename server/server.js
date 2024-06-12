import dotenv from "dotenv";
import { app } from "./app.js";
import { dbConnect } from "./database/connectDb.js";

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000; //getting data from .env file

//if the databse get connected successfully than the server will start running at defined PORT
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`App running successfully at port ${PORT}`);
  });
});
