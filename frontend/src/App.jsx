import React, { useContext, useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home2";
import Signup from "./pages/Signup";
import SignIn from "./pages/Signin";
import Customize from "./pages/Customize";
import Customize2 from "./pages/Customize2";
import axios from "axios";
import { api, baseUrl } from "./common/api";
import { UserContext } from "./context/UserContext";

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const handleUserData = useCallback(async () => {
    try {
      const result = await axios({
        method: api.getUser.method,
        url: `${baseUrl}/${api.getUser.url}`,
        withCredentials: true,
      });
      
      setUser(result.data?.user ?? null);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null); // Explicitly set null if request fails
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    handleUserData();
  }, [handleUserData]);

  if (loading) {
    return <div className="text-center font-bold text-2xl">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* ✅ Only redirect to /signin when we are sure there is NO user */}
        <Route
          path="/"
          element={
            user ? <Home /> : <Navigate to="/signin" replace />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={user ? <Navigate to="/" replace /> : <SignIn />} />
        <Route path="/customize" element={user ? <Customize /> : <Navigate to="/signin" replace />} />
        <Route path="/customize2" element={user ? <Customize2 /> : <Navigate to="/signin" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
