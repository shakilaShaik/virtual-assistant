import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const geminiResponse = async (prompt) => {
  if (!prompt || typeof prompt !== "string") {
    throw new Error("Prompt must be a valid string");
  }

  const data = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    throw new Error("Gemini API call failed");
  }
};
export default geminiResponse;
