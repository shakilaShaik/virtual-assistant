// Customize2.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { baseUrl, api } from "../common/api";

const Customize2 = () => {
  const navigate = useNavigate();
  const { backendImage, selectedImage, assistantName, setAssistantName } =
    useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!assistantName.trim()) {
      alert("Please enter an assistant name.");
      return;
    }

    setLoading(true);
    const formData = new FormData();

    if (backendImage) {
      formData.append("file", backendImage);
    } else {
      formData.append("imageURL", selectedImage);
    }

    formData.append("assistantName", assistantName.trim());

    try {
      const res = await axios({
        method: api.method,
        url: `${baseUrl}/${api.updateUser}`,
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Assistant updated:", res.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to update assistant:", err);
      alert("Failed to save assistant. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] py-10 flex items-center justify-center">
      <div className="w-full max-w-md px-6 text-center">
        <h1 className="text-white text-[30px] mb-[30px]">
          Enter your Assistant Name
        </h1>

        <input
          name="assistantName"
          placeholder="Ex: Sofi"
          className="w-full px-5 py-3 rounded-full bg-white/20 text-white placeholder:text-white outline-none border border-white"
          value={assistantName}
          onChange={(e) => setAssistantName(e.target.value)}
        />

        <button
          disabled={loading}
          className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full justify-center"
          onClick={handleSubmit}>
          {loading ? "Saving..." : "Create Your Assistant"}
        </button>
      </div>
    </div>
  );
};

export default Customize2;
