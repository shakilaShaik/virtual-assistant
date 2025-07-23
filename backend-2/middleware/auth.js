import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  try {
    const tokenFromCookie = req.cookies.token;
    if (!tokenFromCookie) {
      return res.status(400).json({ msg: "token not found" });
    }
    const verifyToken = await jwt.verify(
      tokenFromCookie,
      process.env.JWT_SECRET
    );
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    return res.status(500).json({ msg: "cookie parsing error" });
  }
};
export default auth;
