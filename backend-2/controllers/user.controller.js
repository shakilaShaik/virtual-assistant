import bcrypt from "bcryptjs";
import getToken from "../config/token.js";
import userModel from "../models/user.model.js";
import geminiResponse from "../gemini.js";
import moment from "moment/moment.js";
import uploadingToMulter from "../middleware/multer.js";
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
      maxAge: 30 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "none",
      secure: process.env.NODE_ENV === "production"
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
    console.log(req)
    const userId = req.userId;

    const user = await userModel.findById(userId).select("-password");
    console.log("user from get user route", user);
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
    const { assistantName, imageURL } = req.body;
    let assistantImage;
    if (req.file) {
      assistantImage = await uploadingToMulter(req.file.path);
    } else {
      assistantImage = imageURL;
    }
    const user = await userModel
      .findByIdAndUpdate(
        req.userId,
        {
          assistantImage,
          assistantName,
        },
        { new: true }
      )
      .select("-password");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ msg: "update assistant error}" });
  }
};
// export const askToAssistant = async (req, res) => {
//   try {
//     const { command } = req.body;
//     const user = await userModel.findById(req.userId);

//     if (!user) {
//       return res.status(404).json({ response: "User not found" });
//     }

//     user.history.push(command);
//     await user.save();

//     const userName = user.name;
//     const assistantName = user.assistantName;
//     const result = await geminiResponse(command, assistantName, userName);

//     const jsonConvert = result.match(/{[\s\S]*}/);
//     if (!jsonConvert) {
//       return res.status(400).json({ response: "Sorry, I can’t find anything related" });
//     }

//     let geminiResult;
//     try {
//       geminiResult = JSON.parse(jsonConvert[0]);
//     } catch {
//       return res.status(400).json({ response: "Sorry, response was not valid JSON." });
//     }

//     const type = geminiResult.type;

//     switch (type) {
//       case "get-date":
//         return res.json({
//           type,
//           userInput: geminiResult.userInput,
//           response: `Current date is ${moment().format("YYYY-MM-DD")}`,
//         });

//       case "get-time":
//         return res.json({
//           type,
//           userInput: geminiResult.userInput,
//           response: `Current time is ${moment().format("hh-mm A")}`,
//         });

//       case "get-day":
//         return res.json({
//           type,
//           userInput: geminiResult.userInput,
//           response: `Today is ${moment().format("ddd")}`,
//         });

//       case "get-month":
//         return res.json({
//           type,
//           userInput: geminiResult.userInput,
//           response: `This month is ${moment().format("MMM")}`,
//         });

//       case "youtube-search":
//       case "google-search":
//       case "youtube-play":
//       case "instagram-open":
//       case "facebook-open":
//       case "weather-show":
//         return res.json({
//           type,
//           userInput: geminiResult.userInput,
//           response: geminiResult.response,
//         });

//       default:
//         return res.status(400).json({
//           response: "I didn't understand that command.",
//         });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       response: "Server error, please try again.",
//     });
//   }
// };



export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;

    // ✅ Validate input
    if (!command || typeof command !== "string") {
      return res.status(400).json({ response: "Command is required and must be a string." });
    }

    // ✅ Make sure user is fetched properly
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ response: "User not found" });
    }

    // // ✅ Ensure history is always an array
    // if (!Array.isArray(user.history)) {
    //   user.history = [];
    // }

    // // ✅ Save user command in history
    // user.history.push(command);
    // await user.save();

    const userName = user.name || "User";
    const assistantName = user.assistantName || "Assistant";

    // ✅ Get Gemini response
    const result = await geminiResponse(command, assistantName, userName);
    console.log("The result from gemini", result)




    const { type, userInput, response } = result;

    // ✅ Handle supported commands
    switch (type) {

      case "general":
        return res.json({ type, userInput, response });
      case "get-date":
        return res.json({
          type,
          userInput,
          response: `Current date is ${moment().format("YYYY-MM-DD")}`,
        });


      case "get-time":
        return res.json({
          type,
          userInput,
          response: `Current time is ${moment().format("hh:mm A")}`,
        });

      case "get-day":
        return res.json({
          type,
          userInput,
          response: `Today is ${moment().format("dddd")}`,
        });

      case "get-month":
        return res.json({
          type,
          userInput,
          response: `This month is ${moment().format("MMMM")}`,
        });



      default:
        return res.status(400).json({
          response: "I didn’t understand that command.",
        });
    }
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({
      response: "Server error, please try again.",
    });
  }
};
