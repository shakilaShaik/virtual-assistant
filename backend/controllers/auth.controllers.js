// import bcrypt from "bcryptjs"; // ✅ bcrypt import
// import getToken from "../config/token.js";
// import userSchema from "../models/user.model.js";

// export const SignUp = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existEmail = await userSchema.findOne({ email });
//     if (existEmail) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ message: "Password must be at least 6 characters" });
//     }

//     const hashPassword = await bcrypt.hash(password, 10);
//     const user = await userSchema.create({
//       name,
//       password: hashPassword,
//       email,
//     });

//     const token = await getToken(user._id);
//     res.cookie("token", token, {
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//       sameSite: "strict",
//       secure: false, // ✅ change to true in production
//     });

//     return res.status(201).json(user);
//   } catch (error) {
//     return res.status(500).json({ message: `Signup error: ${error.message}` });
//   }
// };

// export const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const existUser = await userSchema.findOne({ email });
//     if (!existUser) {
//       return res.status(400).json({ message: "Email does not exist" });
//     }

//     const isMatch = await bcrypt.compare(password, existUser.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Incorrect password" });
//     }

//     const token = await getToken(existUser._id);
//     res.cookie("token", token, {
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//       sameSite: "strict",
//       secure: false,
//     });

//     return res.status(200).json(existUser);
//   } catch (error) {
//     return res.status(500).json({ message: `Login error: ${error.message}` });
//   }
// };

// export const Logout = async (req, res) => {
//   try {
//     res.clearCookie("token"); // ✅ Make sure the name matches the cookie set in Login/Signup
//     return res.status(200).json({ msg: "Logged out" });
//   } catch (error) {
//     return res.status(500).json({ msg: `Logout error: ${error.message}` });
//   }
// };
