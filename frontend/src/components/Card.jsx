import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Card = ({ img }) => {
  const { selectedImage, setSelectedImage } = useContext(UserContext);

  const isSelected = selectedImage === img;

  return (
    <div
      onClick={() => setSelectedImage(img)}
      className={`w-[150px] h-[300px] bg-[#030326] border-2
        border-blue-500 rounded-2xl overflow-hidden hover:shadow-2xl cursor-pointer 
        hover:border-4 hover:border-white ${
          isSelected ? "border-4 border-white shadow-2xl" : ""
        }`}>
      <img src={img} className="h-full w-full object-cover" alt="Card" />
    </div>
  );
};

export default Card;
