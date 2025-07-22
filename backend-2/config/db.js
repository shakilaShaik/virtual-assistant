import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongo_url = process.env.MONGODB_URL;
// console.log(mongo_url)
const mongoConnect = async () => {
  try {
    const connectMongo = await mongoose.connect(mongo_url);
    if (connectMongo) {
      console.log("mongo connected");
    }
  } catch (error) {
    console.log(error, "++++++++++++++++++++mongo error");
  }
};

export default mongoConnect;
