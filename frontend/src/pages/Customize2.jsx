import React from "react";
import { useNavigate } from "react-router-dom";

const Customize2 = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] py-10 flex items-center justify-center">
      <div className="w-full max-w-md px-6 text-center">
        <h1 className="text-white text-[30px] mb-[30px]">
          Enter your Assistant Name
        </h1>

        <input
          name="assistantName"
          placeholder="Ex: sofi"
          className="w-full px-5 py-3 rounded-full bg-white/20 text-white placeholder:text-white outline-none border border-white"
        />

        <button
          className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full justify-center"
          onClick={() => navigate("/")}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Customize2;
