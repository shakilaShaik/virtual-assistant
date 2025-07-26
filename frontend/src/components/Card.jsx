import React from "react";

const Card = ({ img }) => {
  return (
    <div
      className="w-[150px] h-[300px] bg-[#030326] border-2
    border-[blue] rounded-2xl overflow-hidden hover:shadow-2xl cursor-pointer hover:border-4 hover:border-white">
      <img src={img} className="h-full object-cover" alt="" />
    </div>
  );
};

export default Card;
