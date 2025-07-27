/* eslint-disable react-refresh/only-export-components */
import React, { useState, createContext, use } from "react";

// 1️⃣ Create a context object
export const UserContext = createContext();

// 2️⃣ Create a Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [assistantName,setAssistantName]=useState(null)
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
        setAssistantName
      }}>
      {children}
    </UserContext.Provider>
  );
};
