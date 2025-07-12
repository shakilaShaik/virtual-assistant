import React, { useState } from "react";
import singupbg from "../assets/signup-img.png";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-[100vh]  bg-cover flex justify-center align-items-center bg-center"
      style={{
        backgroundImage: `url(${singupbg})`,
      }}>
      <form className="w-[90%] h-[500px] max-w-[500px] bg-transparent backdrop-blur shadow-lg shadow-blue flex flex-col items-center  gap-[20px] mt-10 px-[20px]">
        <h1 className="text-white text-[30px] font-semibold mb-[30px] mt-7">
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
            className="w-full h-full outline-none border-2 border-white bg-transparent text-white placeholder:text-gray-300 px-[20px] pr-[50px] rounded-full text-[18px] "
          />
          {!showPassword && (
            <IoEye
              className="absolute right-[20px] top-1/2 transform -translate-y-1/2 text-white text-[22px] cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
          {showPassword && (
            <IoEyeOff
              className="absolute right-[20px] top-1/2 transform -translate-y-1/2 text-white text-[22px] cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        <button className="min-w-[150px] h-[60px] bg-white rounded-full font-semibold text-[19px] cursor-pointer">
          Signup
        </button>
        <p  onClick={()=>navigate('/signin')} className="text-white text-[18px] cursor-pointer ">
          Already have an account?
          <span className="text-blue-950 font-semibold cursor-pointer ">
            Signin
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
