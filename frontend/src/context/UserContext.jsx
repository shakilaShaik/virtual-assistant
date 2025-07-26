/* eslint-disable react-refresh/only-export-components */
import { useState,createContext} from "react";

// UserContext.js

// 1️⃣ Create a context object
// eslint-disable-next-line no-undef
export const UserContext = createContext();

// 2️⃣ Create a Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Global state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

