import mongoose from "mongoose";

export async function dbConnect() {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true, // enable SSL/TLS
      tlsAllowInvalidCertificates: true, // allows self-signed certs (only for local dev!)
    });
    console.log("db connected successfully");
  } catch (error) {
    console.log("db failed to connect. Error: ", error);
    process.exit(1);
  }
}
