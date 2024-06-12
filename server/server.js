import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT || 5000, () => {
  console.log(`App running successfully at port ${PORT}`);
});
