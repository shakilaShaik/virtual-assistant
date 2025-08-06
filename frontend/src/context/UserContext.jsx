/* eslint-disable react-refresh/only-export-components */
import React, { useState, createContext } from "react";
import axios from "axios";
import { api } from "../common/api";

// 1️⃣ Create a context object
export const UserContext = createContext();

// 2️⃣ Create a Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [assistantName, setAssistantName] = useState(null);
  const getGeminiRes = async (command) => {
    try {
      const result = await axios({
        url: api.askGemini.url, // Assuming api.askGemini has a url property
        method: api.askGemini.method,
        data: { command }, // Send command in the body
        withCredentials: true,
      });
      return result.data;
    } catch (error) {
      console.log("error from gemini response", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        frontendImage,
        setFrontendImage,
        backendImage,
        setBackendImage,
        selectedImage,
        setSelectedImage,
        assistantName,
        setAssistantName,
        getGeminiRes, // 🔁 Make this function available in context
      }}>
      {children}
    </UserContext.Provider>
  );
};
