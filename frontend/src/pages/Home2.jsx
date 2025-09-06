import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl, api } from "../common/api";

 const Home = () => {
  const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Chat history
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
console.log(user)
  // 🔹 Send chat message to backend
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${baseUrl}/${api.askGemini.url}`,
        {
          command: input,
          assistantName: user?.assistantName,
          userName: user?.userName,
        },
        { withCredentials: true }
      );

      let reply = res.data;
      if (typeof reply === "string") {
        try {
          reply = JSON.parse(reply); // backend might return JSON string
        } catch {
          reply = { response: reply, type: "general" };
        }
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: reply?.response || "Hmm, no response." },
      ]);
    } catch (err) {
      console.error("Error getting Gemini response:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "⚠️ Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios({
        method: api.logout.method,
        url: `${baseUrl}/${api.logout.url}`,
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center relative">
      {/* 🔹 Header */}
      <div className="absolute top-4 right-4 hidden sm:flex flex-col gap-2 z-10">
        <Link
          to="/customize"
          className="px-4 py-2 rounded-full font-semibold text-sm sm:text-base bg-white text-blue-800 hover:bg-blue-100"
        >
          Customize Account
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-full font-semibold text-sm sm:text-base bg-white text-blue-800 hover:bg-blue-100"
        >
          Log out
        </button>
      </div>

      {/* 🔹 Mobile menu */}
      <div className="absolute top-4 right-4 sm:hidden z-20">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-14 right-4 sm:hidden flex flex-col gap-2 bg-white rounded-xl shadow-lg p-3 z-20">
          <Link
            to="/customize"
            className="px-4 py-2 rounded-lg font-semibold text-sm text-blue-800 hover:bg-blue-100"
          >
            Customize Account
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg font-semibold text-sm text-blue-800 hover:bg-blue-100"
          >
            Log out
          </button>
        </div>
      )}

      {/* 🔹 Chat container */}
      <div className="flex-grow w-full sm:w-[600px] flex flex-col px-4 pt-20 sm:pt-10">
       
        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-white/10 rounded-xl shadow-md ">
        <div className="text-center mt-1.5">
  <h1 className="font-bold text-2xl text-white">
    Hello! {user.name}
  </h1>
  <h2 className="text-white">
    How can I help you today?
  </h2>
  <p className="text-gray-300 text-sm mt-2 italic">
    🤖 I'm your AI assistant — ready to answer questions, brainstorm ideas, or chat!
  </p>
</div>

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start mb-2 ${
                msg.role === "user"
                  ? " justify-end"
                  : " justify-start"
              }`}
            >
           {msg.role==="assistant" &&(
            <img src={user.assistantImage} className="w-8 h-8 rounded-full mr-2"/>
           )}
      <div className={`p-3 rounded-xl max-w-[70%]
        ${msg.role==="user"?"bg-blue-500 text-white":" bg-gray-200 text-black" }`
      }>
        
        {msg.text}
      </div>


             
            </div>
          ))}

          {loading && (
            <div className="p-3 rounded-xl bg-gray-300 text-black self-start">
              Typing...
            </div>
          )}
        </div>

        {/* 🔹 Input box */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={`Ask ${user?.assistantName || "Assistant"} anything...`}
            className=" rounded-full flex-1 p-3  bg-white shadow-md focus:outline-none text-blue-700 mb-5"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 rounded-full bg-white text-blue-600  font-semibold hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home