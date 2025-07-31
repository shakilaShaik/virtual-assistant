const geminiResponse = async (prompt) => {
  if (typeof prompt !== "string" || prompt.trim() === "") {
    throw new Error("Prompt must be a non-empty string");
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
    const result = await axios.post(url, data, { headers });
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    throw error;
  }
};
export default geminiResponse