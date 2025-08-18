
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { FiArrowLeft } from "react-icons/fi"; // Arrow icon from react-icons
import {  FiMenu, FiX } from "react-icons/fi";
import AiVoiceEffect from '../assets/Aivoice.gif'
import voiceListen from '../assets/VoiceRecognition.gif'
export const Home = () => {
  const { user, getGeminiRes } = useContext(UserContext);

  const [listening, setListening] = useState(false);
  const [userText, setUserText]= useState("")
    const [aiText, setAiText]= useState("")

  
  const isSpeakRef = useRef(false);
  const recognitionRef = useRef(null)
  const isRecognisingRef = useRef(false)
  const synth = window.speechSynthesis;

  console.log("assistant name is ", user?.assistantName);

  // ✅ Start speech recognition safely
  const startRecognition = () => {
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch (error) {
      if (!error.message.includes("start")) {
        console.error("Recognition start error:", error);
      }
    }
  };

  // ✅ Speak out text
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    isSpeakRef.current = true;

    utterance.onend = () => {
      setAiText("")
      isSpeakRef.current = false;
      startRecognition(); // resume listening after speaking
    };

    synth.speak(utterance);
  };

  // ✅ Handle commands based on response type
  const handleCommand = (data) => {
    const { type, userInput, response } = data;

    // Speak the response
    if (response) speak(response);

    const query = encodeURIComponent(userInput || "");

    switch (type) {
      case "google-search":
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        break;

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
      case "youtube-play": // ✅ fixed OR bug
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
        break;
    }
  };

  useEffect(() => {
    if (!user || !user.assistantName) return; // safety check

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("SpeechRecognition API not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognitionRef.current = recognition;
   

    // ✅ Safe start
    const safeRecognition = () => {
      try {
        if (!isSpeakRef.current && !isRecognisingRef.current) {
          recognition.start();
        }
      } catch (error) {
        if (error.name !== "InvalidStateError") {
          console.error("Recognition start error:", error);
        }
      }
    };

    recognition.onstart = () => {
      console.log("Recognition started");
      isRecognisingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      console.log("Recognition ended");
      isRecognisingRef.current = false;
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error);
      setListening(false);

      if (event.error !== "aborted" && !isSpeakRef.current) {
        setTimeout(() => safeRecognition(), 1000);
      }
    };

    // ✅ Handle transcript result
    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log("Heard:", transcript);

      if (
        transcript.toLowerCase().includes(user.assistantName.toLowerCase())
      ) {
        setAiText("")
        setUserText(transcript)
        recognition.stop();
        isRecognisingRef.current = false;
        setListening(false);

        const data = await getGeminiRes(transcript);
        console.log("Gemini response:", data);
        handleCommand(data);
        setAiText(data.response)
        setUserText("")
      }
    };

    // Retry every 10s if recognition unexpectedly stops
    const fallback = setInterval(() => {
      if (!isSpeakRef.current && !isRecognisingRef.current) {
        safeRecognition();
      }
    }, 10000);

    // Initial start
    setTimeout(() => safeRecognition(), 1000);

    // Cleanup
    return () => {
      recognition.stop();
      setListening(false);
      isRecognisingRef.current = false;
      clearInterval(fallback);
    };
  }, [user, getGeminiRes]);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center relative">
      {/* Desktop buttons (hidden on mobile) */}
      <div className="absolute top-4 right-4 hidden sm:flex flex-col gap-2 z-10">
        <button className="px-4 py-2 rounded-full font-semibold text-sm sm:text-base bg-white text-blue-800 hover:bg-blue-100 transition duration-300">
          Customize Account
        </button>
        <button className="px-4 py-2 rounded-full font-semibold text-sm sm:text-base bg-white text-blue-800 hover:bg-blue-100 transition duration-300">
          Log out
        </button>
      </div>

      {/* Hamburger (visible only on mobile) */}
      <div className="absolute top-4 right-4 sm:hidden z-20">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu (dropdown) */}
      {menuOpen && (
        <div className="absolute top-14 right-4 sm:hidden flex flex-col gap-2 bg-white rounded-xl shadow-lg p-3 z-20">
          <button className="px-4 py-2 rounded-lg font-semibold text-sm text-blue-800 hover:bg-blue-100 transition duration-300">
            Customize Account
          </button>
          <button className="px-4 py-2 rounded-lg font-semibold text-sm text-blue-800 hover:bg-blue-100 transition duration-300">
            Log out
          </button>
        </div>
      )}

      {/* Mobile back arrow */}
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

      {/* Assistant Name */}
      <h1 className="text-white text-[18px] font-semibold">
        I'm {user.assistantName}
      </h1>

      {/* Voice Effect Images */}
      {!aiText && (
        <img src={voiceListen} alt="" className="w-[200px]" />
      )}
      {aiText && (
        <img src={AiVoiceEffect} alt="" className="w-[200px]" />
      )}

      {/* User or AI Text */}
      <h1 className="text-white text-[18px] font-bold">
        {userText ? userText : aiText ? aiText : null}
      </h1>
    </div>
  );
}