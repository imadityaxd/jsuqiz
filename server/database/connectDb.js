import mongoose from "mongoose";
const DB_NAME = "quiz"; //it's a sub folder that will be created in mongodb Collection and all the data will store inside it in key-value pair
export async function dbConnect() {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`); //connecting database
    console.log("db connected successfully");
  } catch (error) {
    console.log("db failed to connect. Error: ", error);
    process.exit(1);  //this method terminate the process with error code 1
  }
}
