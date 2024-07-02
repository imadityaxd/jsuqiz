import mongoose from "mongoose";
export async function dbConnect() {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`); //connecting database
    console.log("db connected successfully");
  } catch (error) {
    console.log("db failed to connect. Error: ", error);
    process.exit(1);  
  }
}
