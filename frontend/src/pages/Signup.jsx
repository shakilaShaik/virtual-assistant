// src/pages/Signup.jsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import signupBg from "../assets/signup-img.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
// import { api, baseUrl } from "../common/api.jsx";
import { api, baseUrl } from "../common/api"
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

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(2, "Too short"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      console.log("url is ", `${baseUrl}/${api.register.url}`);
      const res = await axios({
        method: api.register.method,
        url: ` ${baseUrl}/${api.register.url}`,
        data: values,
        withCredentials: true,
      });

      toast.success("Signup successful!", res.data.msg);
      navigate("/signin");
    } catch (error) {
      toast.error(error.res?.data?.msg || "Signup failed");
    } finally {
      setSubmitting(false);
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
          validationSchema={validationSchema}
          onSubmit={handleSignup}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-5 py-3 rounded-full bg-white/20 text-white placeholder:text-white outline-none border border-white"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-400 text-sm mt-1 ml-2"
                />
              </div>

              {/* Email */}
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-5 py-3 rounded-full bg-white/20 text-white placeholder:text-white outline-none border border-white"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-400 text-sm mt-1 ml-2"
                />
              </div>

              {/* Password with toggle */}
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
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-400 text-sm mt-1 ml-2"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-full font-semibold text-lg transition duration-300 ${
                  isSubmitting
                    ? "bg-white/50 text-gray-600 cursor-not-allowed"
                    : "bg-white text-blue-800 hover:bg-blue-100"
                }`}>
                {isSubmitting ? "Signing Up..." : "Signup"}
              </button>

              {/* Link to Signin */}
              <p className="text-white text-center text-sm mt-4">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/signin")}
                  className="underline cursor-pointer text-blue-200">
                  Signin here
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;

// import React from "react";

//  const Signup = () => {
//   return <div>Signup</div>;
// };
// export default Signup
