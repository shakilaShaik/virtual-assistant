import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { FiArrowLeft } from "react-icons/fi"; // Arrow icon from react-icons

export const Home = () => {
  const { user,getGeminiRes } = useContext(UserContext);
  console.log("assistant name is ", user.assistantName);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "em-US";
    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log(transcript);
      if (transcript.toLowerCase().includes(user.assistantName.toLowerCase())) {
        let response = await getGeminiRes(transcript);
        console.log(response);
      }
    };
    recognition.start();
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center relative">
      {/* Top-right buttons container (stacked vertically) */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button
          type="button"
          className="px-4 py-2 rounded-full font-semibold text-sm sm:text-base bg-white text-blue-800 hover:bg-blue-100 transition duration-300">
          Customize Account
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded-full font-semibold text-sm sm:text-base bg-white text-blue-800 hover:bg-blue-100 transition duration-300">
          Log out
        </button>
      </div>

      {/* Mobile back arrow (visible only on small screens) */}
      <button className="absolute top-4 left-4 sm:hidden text-white text-2xl z-10">
        <FiArrowLeft />
      </button>

      {/* Main content */}
      <div className="flex-grow flex flex-col justify-center items-center gap-4 px-4 pt-20 sm:pt-0">
        <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
          <img
            src={user?.assistantImage}
            alt="Assistant"
            className="h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
