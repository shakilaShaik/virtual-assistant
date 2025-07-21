import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getToken = async (userId) => {
  try {
    const token =  jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    return token;
  } catch (error) {}
};
export default getToken;
