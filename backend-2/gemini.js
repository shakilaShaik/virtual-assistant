// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();
// const API_KEY = process.env.GEMINI_API_KEY;
// const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

// const geminiResponse = async (command, assistantName, userName) => {
//   if (!command || typeof command !== "string") {
//     throw new Error("Command must be a valid string");
//   }

//   const prompt = `You are a virtual assistant named ${assistantName}, created by ${userName}. 
//   You are not Google. You behave like a voice-enabled assistant.

// Your task is to understand the user's natural language input and respond with a JSON object like this:

// {
//   "type": "general" | "google-search" | "youtube-play" |
//           "get-time" | "get-date" | "get-month" | "calculator-open" |
//           "instagram-open" | "facebook-open" | "weather-show" |
//   "userInput": <original user sentence> e.g.,{only remove your name and all the data in the user input, if anyone ask to search the user input will be the searchable command}
//   "response": <short friendly reply>
// }

// Instructions:
// - "type": determine the user's intent.
// - "userInput": original sentence the user spoke.
// - "response": a short, voice-friendly reply, e.g., "Sure, playing it now", "Here is what I found", "Today is Tuesday", etc.
// Type meanings:
// - "general": if it's a factual or informational question.
// if you know the answer for a question without searching in the google, make it general category
//  and give a short and simple answer of 2 to 3 lines

// - "google-search": if user wants to search something on Google.
// - "youtube-search": if user wants to search something on YouTube.
// - "calculator-open": if user wants to open calculator.
// - "youtube-play": if user wants to play something directly.
// - "instagram-open": if user wants to open Instagram.
// - "facebook-open": if user wants to open Facebook.
// - "get-date": if user asks for the current date.
// - "get-month": if user asks for the current month.
// - "get-day": if user asks for the current day.
// - Use "${userName}" if anyone asks who made you.
// - Only respond with the JSON object, nothing else.

// Now your userInput - ${command}
// `;

//   const data = {
//     contents: [
//       {
//         parts: [
//           {
//             text: prompt,
//           },
//         ],
//       },
//     ],
//   };

//   try {
//     const response = await axios.post(url, data, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
//     return reply || "{}";
//   } catch (error) {
//     console.error("Gemini API error:", error.response?.data || error.message);
//     throw new Error("Gemini API call failed");
//   }
// };

// export default geminiResponse;
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();
// const API_KEY = process.env.GEMINI_API_KEY;
// // console.log(API_KEY, ".....the api key is")
// const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

// const geminiResponse = async (command, assistantName, userName) => {
//   if (!command || typeof command !== "string") {
//     throw new Error("Command must be a valid string");
//   }

//   const prompt = `
// You are a helpful virtual assistant named ${assistantName}, created by ${userName}.
// Behave like a chat assistant, answering naturally but always respond in JSON format without any extra raw arguments:

// {
//   "type": "general" |
//           "get-time" | "get-date" | "get-month" | "get-day" |
//   "userInput": <cleaned user input>,
//   "response": <short, natural reply>
// }

// Rules:
// - If it's factual and you know it → type: "general".
// - If it's a search → search and type accordingly, fetch the links and data from google.
// - if a conversation starts with you , make a session and remember the previous commands to efficiently answer related context.
// - After a refresh you can start a new session.
// - If they ask about you → mention "${userName}" as your creator.
// - Only return JSON. No extra explanation.

// User asked: "${command}"
// `;

//   const data = {
//     contents: [{ parts: [{ text: prompt }] }],
//   };

//   try {
//     const response = await axios.post(url, data, {
//       headers: { "Content-Type": "application/json" },
//     });

//     const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
//     return reply || "{}";
//   } catch (error) {
//     console.error("Gemini API error:", error.response?.data || error.message);
//     throw new Error("Gemini API call failed");
//   }
// };

// export default geminiResponse;

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

let conversationHistory = []; // stored in-memory, resets on refresh
let conversationSummary = ""; // also resets on refresh

/**
 * Summarize conversation to keep prompt small
 */
const summarizeConversation = async () => {
  if (conversationHistory.length < 5) return conversationSummary;

  const summaryPrompt = `
Summarize the following conversation between user and assistant in a concise way,
keeping important facts and context. Respond only with the summary text.

Conversation:
${conversationHistory.map(m => `${m.role}: ${m.content}`).join("\n")}

Current Summary (if any): ${conversationSummary || "(none)"}
`;

  try {
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: summaryPrompt }] }],
    }, {
      headers: { "Content-Type": "application/json" },
    });

    conversationSummary =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || conversationSummary;

    return conversationSummary;
  } catch (err) {
    console.warn("Failed to summarize conversation:", err.message);
    return conversationSummary;
  }
};

/**
 * Main Gemini response function
 */
const geminiResponse = async (command, assistantName, userName) => {
  if (!command || typeof command !== "string") {
    throw new Error("Command must be a valid string");
  }

  // Add new user message to conversation history
  conversationHistory.push({ role: "user", content: command });

  // Summarize if needed
  await summarizeConversation();

  // Build history string with last few exchanges
  const recentHistory = conversationHistory
    .slice(-4)
    .map(msg => `${msg.role}: ${msg.content}`)
    .join("\n");

  const prompt = `
You are a helpful virtual assistant named ${assistantName}, created by ${userName}.
Behave like a chat assistant, answering naturally but always respond in JSON format without any extra raw arguments:

{
  "type": "general" |
          "get-time" | "get-date" | "get-month" | "get-day",
  "userInput": <cleaned user input>,
  "response": <short, natural reply>
}

Rules:
- If it's factual and you know it → type: "general".
- If it's a search → search and type accordingly, fetch the links and data from google.
- Remember previous messages during this session to answer with context.
- After a refresh, start a new session (forget old conversation).
- If they ask about you → mention "${userName}" as your creator.
- Only return JSON. No extra explanation.

Conversation Summary:
${conversationSummary || "(no summary yet)"}

Recent Conversation:
${recentHistory || "(no previous conversation)"}

User asked: "${command.trim()}"
`;

  try {
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }],
    }, {
      headers: { "Content-Type": "application/json" },
    });

    const rawReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    console.log("raw reply is", rawReply)

    let parsedReply;
    try {
      // ✅ Extract JSON safely
      const jsonMatch = rawReply?.match(/{[\s\S]*}/);
      console.log("The json matching", jsonMatch)
      if (!jsonMatch) {
        return res.status(400).json({ response: "Sorry, I couldn’t parse the assistant response." });
      }
      parsedReply = JSON.parse(jsonMatch[0]);
      console.log("parsed reply is", parsedReply)
    } catch {
      console.warn("Gemini returned invalid JSON. Wrapping raw text.");
      parsedReply = { type: "general", userInput: command.trim(), response: rawReply };
    }

    // Add assistant reply to conversation history
    conversationHistory.push({ role: "assistant", content: JSON.stringify(parsedReply) });

    return parsedReply;
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    throw new Error("Gemini API call failed");
  }
};

/**
 * Helper to reset the conversation manually (if needed)
 */
export const resetConversation = () => {
  conversationHistory = [];
  conversationSummary = "";
};

export default geminiResponse;
