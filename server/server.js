
import { app } from "./app.js";
import { dbConnect } from "./database/connectDb.js";

const PORT = process.env.PORT || 5000; 


dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`App running successfully at port ${PORT}`);
  });
});
