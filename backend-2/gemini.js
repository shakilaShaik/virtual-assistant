import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const geminiResponse = async (command, assistantName, userName) => {
  if (!command || typeof command !== "string") {
    throw new Error("Command must be a valid string");
  }

  const prompt = `You are a virtual assistant named ${assistantName}, created by ${userName}. You are not Google. You behave like a voice-enabled assistant.
  
Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google-search" | "youtube-play" |
          "get-time" | "get-date" | "get-month" | "calculator-open" |
          "instagram-open" | "facebook-open" | "weather-show" |
  "userInput": <original user sentence>,{only remove your name and all the data in the user input, if anyone ask to search the user input will be the searchable command}
  "response": <short friendly reply>
}

Instructions:
- "type": determine the user's intent.
- "userInput": original sentence the user spoke.
- "response": a short, voice-friendly reply, e.g., "Sure, playing it now", "Here is what I found", "Today is Tuesday", etc.
Type meanings:
- "general": if it's a factual or informational question.
- "google-search": if user wants to search something on Google.
- "youtube-search": if user wants to search something on YouTube.
- "calculator-open": if user wants to open calculator.
- "youtube-play": if user wants to play something directly.
- "instagram-open": if user wants to open Instagram.
- "facebook-open": if user wants to open Facebook.
- "get-date": if user asks for the current date.
- "get-month": if user asks for the current month.
- "get-day": if user asks for the current day.
- Use "${userName}" if anyone asks who made you.
- Only respond with the JSON object, nothing else.

Now your userInput - ${command}
`;

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

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || "{}";
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    throw new Error("Gemini API call failed");
  }
};

export default geminiResponse;
