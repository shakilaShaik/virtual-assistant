import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // console.log("Cookies received:", req.cookies);

    const tokenFromCookie = req.cookies.token;
    if (!tokenFromCookie) {
      return res.status(400).json({ msg: "Token not found" });
    }

    const verifyToken = jwt.verify(tokenFromCookie, process.env.JWT_SECRET);
    // console.log("Decoded Token:", verifyToken);

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    // console.error("Auth Middleware Error:", error.message);
    return res
      .status(401)
      .json({ msg: "Invalid or expired token", error: error.message });
  }
};

export default auth;
