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
      <h1>I'm {user.assistantName}</h1>
    </div>
  );
};
