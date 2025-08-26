import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { FiArrowLeft, FiMenu, FiX } from "react-icons/fi";
import AiVoiceEffect from "../assets/Aivoice.gif";
import voiceListen from "../assets/VoiceRecognition.gif";

import { Link } from 'react-router-dom';
import axios from "axios";
import { baseUrl,api } from "../common/api";

export const Home = () => {
  const { user, getGeminiRes } = useContext(UserContext);
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const isSpeakRef = useRef(false);
  const recognitionRef = useRef(null);
  const isRecognisingRef = useRef(false);
  const synth = window.speechSynthesis;

  // ✅ Speak out text
  const speak = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    isSpeakRef.current = true;

    utterance.onend = () => {
      isSpeakRef.current = false;
      startRecognition();
    };

    synth.speak(utterance);
  };

  // ✅ Handle commands safely
  const handleCommand = (data) => {
    if (!data) return;
    const { type, userInput, response } = data;

    if (response) speak(response);

    const query = encodeURIComponent(userInput || "");
    try {
      switch (type) {
        case "google-search":
        case "calculator-open":
          window.open(`https://www.google.com/search?q=${query}`, "_blank");
          break;
        case "instagram-open":
          window.open(`https://www.instagram.com/`, "_blank");
          break;
        case "facebook-open":
          window.open(`https://www.facebook.com/`, "_blank");
          break;
        case "youtube-search":
          window.open(`https://www.youtube.com/results?search_query=${query}`,
            "_blank")
          break
        case "youtube-play":
          window.open(
            `https://www.youtube.com/results?search_query=${query}`,
            "_blank"
          );
          break;
        case "weather-show":
          window.open(`https://www.google.com/search?q=weather`, "_blank");
          break;
        default:
          console.log("Unknown command type:", type);
      }
    } catch (err) {
      console.error("Error handling command:", err);
    }
  };

  // ✅ Start recognition safely
  const startRecognition = () => {
    const recognition = recognitionRef.current;
    if (!recognition || isRecognisingRef.current || isSpeakRef.current) return;

    try {
      recognition.start();
    } catch (err) {
      if (err.name !== "InvalidStateError")
        console.error("Recognition start error:", err);
    }
  };

  useEffect(() => {
    if (!user || !user.assistantName) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("SpeechRecognition API not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      isRecognisingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      isRecognisingRef.current = false;
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error);
      setListening(false);
      if (event.error !== "aborted" && !isSpeakRef.current)
        setTimeout(startRecognition, 1000);
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      if (!transcript) return;
      console.log("Heard:", transcript);

      if (transcript.toLowerCase().includes(user.assistantName.toLowerCase())) {
        recognition.stop();
        isRecognisingRef.current = false;
        setListening(false);

        setUserText(transcript);
        setAiText("");

        try {
          const data = await getGeminiRes(transcript);
          handleCommand(data);
          setAiText(data?.response || "I didn't understand that.");
        } catch (err) {
          console.error("Error getting Gemini response:", err);
          setAiText("Sorry, something went wrong.");
        } finally {
          setUserText("");
        }
      }
    };

    // Retry every 10s
    const fallback = setInterval(() => startRecognition(), 10000);

    setTimeout(() => startRecognition(), 1000);

    return () => {
      recognition.stop();
      isRecognisingRef.current = false;
      clearInterval(fallback);
    };
  }, [user, getGeminiRes]);


  const handleLogout=async()=>{
    try {
      await axios({
        method:api.logout.method,
        url:`${baseUrl}/${api.logout.url}`,
        withCredentials:true
      })
    } catch (error) {
      console.log(error)
      
    }

  }
  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center relative">
      {/* Desktop buttons */}
      <div className="absolute top-4 right-4 hidden sm:flex flex-col gap-2 z-10">
        <Link 
        to="/customize"
        className="px-4 py-2 rounded-full font-semibold text-sm sm:text-base bg-white text-blue-800 hover:bg-blue-100">
          Customize Account
        /</Link>
        <button  onClick={handleLogout} className="px-4 py-2 rounded-full font-semibold text-sm sm:text-base bg-white text-blue-800 hover:bg-blue-100">
          Log out
        </button>
      </div>

      {/* Mobile menu */}
      <div className="absolute top-4 right-4 sm:hidden z-20">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-14 right-4 sm:hidden flex flex-col gap-2 bg-white rounded-xl shadow-lg p-3 z-20">
          <button className="px-4 py-2 rounded-lg font-semibold text-sm text-blue-800 hover:bg-blue-100">
            Customize Account
          </button>
          <button 
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg font-semibold text-sm text-blue-800 hover:bg-blue-100">
            Log out
          </button>
        </div>
      )}

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

      <h1 className="text-white text-[18px] font-semibold">
        I'm {user?.assistantName}
      </h1>

      {!aiText && <img src={voiceListen} alt="" className="w-[200px]" />}
      {aiText && <img src={AiVoiceEffect} alt="" className="w-[200px]" />}

      <h1 className="text-white text-[18px] font-bold">
        {userText || aiText || null}
      </h1>
    </div>
  );
};
