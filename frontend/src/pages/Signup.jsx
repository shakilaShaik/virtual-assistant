import React, { useState } from "react";
import singupbg from "../assets/signup-img.png";

import { IoEye } from "react-icons/io5";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      className="w-full h-[100vh]  bg-cover flex justify-center align-items-center bg-center"
      style={{
        backgroundImage: `url(${singupbg})`,
      }}>
      <form className="w-[90%] h-[600px] max-w-[500px] bg-transparent backdrop-blur shadow-lg shadow-blue flex flex-col items-center  gap-[20px] mt-10 px-[20px]">
        <h1 className="text-white text-[30px] font-semibold mb-[30px] mt-2">
          Register
        </h1>

        <input
          type="text"
          placeholder="Enter Your Name"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-bg-gray-300 px-[20px]  py-[10px] rounded-full"
        />

        <input
          type="Email"
          placeholder="Enter Your Email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-bg-gray-300 px-[20px]  py-[10px] rounded-full"
        />

        <div className="w-full h-[60px] relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            className="w-full h-full outline-none border-2 border-white bg-transparent text-white placeholder:text-gray-300 px-[20px] pr-[50px] rounded-full text-[18px]"
          />
          {showPassword && (
            <IoEye
              className="absolute right-[20px] top-1/2 transform -translate-y-1/2 text-white text-[22px] cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;
