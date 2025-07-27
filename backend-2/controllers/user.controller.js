import bcrypt from "bcryptjs";
import getToken from "../config/token.js";
import userModel from "../models/user.model.js";


export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const existEmail = await userModel.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      password: hashPassword,
      email,
    });

    // const token = getToken(user._id);
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    //   sameSite: "strict",
    //   secure: false, // ✅ should be true in production
    // });

    return res.status(201).json({ user: user, msg: "signup successful" });
  } catch (error) {
    return res.status(500).json({ message: `Signup error: ${error.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const userInDb = await userModel.findOne({ email });
    if (!userInDb) {
      return res.status(400).json({ msg: "User not found, please register" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, userInDb.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    // Generate token
    const token = getToken(userInDb._id);

    // Set httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict",
      secure: false, // Set to true in production
    });

    // Send user details (excluding password)
    const { password: _, ...userWithoutPassword } = userInDb.toObject();
    return res.status(200).json({
      msg: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ msg: "Login failed, server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ msg: "logout successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "logout error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(400).json({ msg: "user not found" });
  }
};


export const updateAssistant = async (req, res) => {
  try {

    const { assistantName, imageURL } = req.body
    let assistantImage;
    if (req.file) {
      assistantImage = await upload(req.file.path)
    }
    else {
      assistantImage = imageURL
    }
    const user = await userModel.findByIdAndUpdate(req.userId, {
      assistantImage, assistantName
    }, { new: true }).select("-password")
    
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json({ msg: "update assistant error}" })
    
  }
  }
  
