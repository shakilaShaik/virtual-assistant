// src/pages/Signup.jsx
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import signupBg from "../assets/signup-img.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { api, baseUrl } from "../common/api";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSignup = async (values, actions) => {
    try {
      const res = await axios({
        method: api.register.method,
        url: `${baseUrl}/${api.register.url}`,
        data: values,
        withCredentials: true,
      });
      toast.success(res.data.msg || "Signup successful!");
      actions.resetForm(); // ✅ Reset form fields
      navigate("/signin");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-center bg-cover"
      style={{ backgroundImage: `url(${signupBg})` }}>
      <ToastContainer />
      <div className="w-[90%] max-w-[500px] bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleSignup(values, actions);
          }}>
          <Form className="flex flex-col gap-5">
            <Field
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full px-5 py-3 rounded-full bg-white/20 text-white placeholder:text-white outline-none border border-white"
            />

            <Field
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full px-5 py-3 rounded-full bg-white/20 text-white placeholder:text-white outline-none border border-white"
            />

            <div className="relative">
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-5 py-3 pr-12 rounded-full bg-white/20 text-white placeholder:text-white outline-none border border-white"
              />
              <div
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <IoEyeOff size={22} /> : <IoEye size={22} />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold text-lg bg-white text-blue-800 hover:bg-blue-100 transition duration-300">
              Signup
            </button>

            <p className="text-white text-center text-sm mt-4">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/signin")}
                className="underline cursor-pointer text-blue-200">
                Signin here
              </span>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
