import React from "react";

const Card = ({ img, onClick, selected }) => {
  return (
    <div
      onClick={onClick}
      className={`w-[150px] h-[300px] bg-[#030326] border-2 rounded-2xl overflow-hidden 
        cursor-pointer transition-all duration-300
        ${
          selected
            ? "border-4 border-white shadow-2xl"
            : "border-blue-500 hover:border-4 hover:border-white hover:shadow-2xl"
        }`}>
      <img src={img} className="h-full w-full object-cover" alt="Card" />
    </div>
  );
};

export default Card;
