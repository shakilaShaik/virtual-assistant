import getToken from "../config/token.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "email already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be greater than 6" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      password: hashPassword,
      email,
    });
    const token = await getToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "signup error" });
  }
};

export const Login = async (req, res) => {
  try {
    const {  email, password } = req.body;

    const existUser = await User.findOne({ email });
    if  (!existUser) {
      return res.status(400).json({ message: "email not exists" });
    }
    const isMatch= await bcrypt.compare(password,existUser.password)
    
    if (!isMatch) {
      return res.status(400).json({message:"incorrect password"})
    }
     
    const token = await getToken(existUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    });
    return res.status(200).json(existUser);
  } catch (error) {
    return res.status(500).json({ message: `login error ${error}` });
  }
};
export const Logout = async (req, res) => {
  try {
    res.clearCookie("access_token")
    return res.status(200).json("msg": "logged out")
  }
  catch (error){
    return res.status(500).json("msg":`Logout errpr ${error}`)
  };
  
}