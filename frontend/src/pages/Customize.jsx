import React, { useContext, useRef } from "react";
import Card from "../components/Card";
import { FiUpload } from "react-icons/fi";

import img1 from "../assets/customise-1.jpg";
import img2 from "../assets/customise-2.jpg";
import img3 from "../assets/customise-3.jpg";
import img4 from "../assets/customise-4.jpg";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Customize = () => {
  const inputImage = useRef();
  const navigate=useNavigate()
  const {
    setBackendImage,
    setFrontendImage,
    frontendImage,
    setSelectedImage,
    selectedImage,
  } = useContext(UserContext);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const objectURL = URL.createObjectURL(file);
    setBackendImage(file);
    setFrontendImage(objectURL);
    setSelectedImage(objectURL); // ✅ Mark uploaded image as selected
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] py-10 px-4">
      <h1 className="text-white text-[30px] text-center mb-[30px]">
        Select Your Assistant Image
      </h1>

      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-start gap-6">
        {[img1, img2, img3, img4].map((image, index) => (
          <Card key={index} img={image} />
        ))}

        {/* Upload Box */}
        <div
          className={`w-[150px] h-[300px] bg-[#030326] border-2 
            rounded-2xl flex justify-center items-center 
            hover:shadow-2xl cursor-pointer hover:border-4 transition-all duration-300
            ${
              selectedImage === frontendImage
                ? "border-white border-4 shadow-2xl"
                : "border-blue-500"
            }`}
          onClick={() => inputImage.current.click()}>
          {!frontendImage ? (
            <FiUpload className="text-white text-4xl" />
          ) : (
            <img
              src={frontendImage}
              className="h-full w-full object-cover rounded-2xl"
              alt="Uploaded"
            />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>

      <div className="w-full flex justify-center mt-10">
        <button className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full justify-center" onClick={() => navigate("/customize2")}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Customize;
