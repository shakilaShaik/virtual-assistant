import React from "react";
import Card from "../components/Card";
import { FiUpload } from "react-icons/fi";

import img1 from "../assets/customise-1.jpg";
import img2 from "../assets/customise-2.jpg";
import img3 from "../assets/customise-3.jpg";
import img4 from "../assets/customise-4.jpg";

const Customize = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] py-10 px-4">
      <h1 className="text-white text-[30px] text-center mb-[30px]">
        Select Your Assistant image
      </h1>

      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-start gap-6">
        <Card img={img1} />
        <Card img={img2} />
        <Card img={img3} />
        <Card img={img4} />

        {/* Upload Box */}
        <div className="w-[200px] h-[300px] bg-[#030326] border-2 border-blue-500 rounded-2xl flex justify-center items-center hover:shadow-2xl cursor-pointer hover:border-white hover:border-4 transition-all duration-300">
          <FiUpload className="text-white text-4xl" />
        </div>
      </div>
      <div className="w-full flex justify-center mt-10">
        <button className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full justify-center">
          Next
        </button>
      </div>
    </div>
  );
};

export default Customize;
