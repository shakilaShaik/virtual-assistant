import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
export const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col gap-[10px]">
      <div
        className="w-[300px] h-[400px] flex justify-center
    items-center overflow-hidden rounded-4xl shadow-lg">
        <img
          src={user?.assistantImage}
          alt=""
          className="h-full object-cover"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-full font-semibold text-lg bg-white text-blue-800 hover:bg-blue-100 transition duration-300">
        Log out
      </button>

      <button
        type="submit"
        className="w-full py-3 rounded-full font-semibold text-lg bg-white text-blue-800 hover:bg-blue-100 transition duration-300">
        customize your Account
      </button>
    </div>
  );
};
