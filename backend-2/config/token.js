import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    return token;
  } catch (error) {
    console.error("Token generation failed:", error.message);
    throw new Error("Failed to generate token.");
  }
};

export default getToken;
