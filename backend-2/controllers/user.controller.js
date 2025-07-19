import userModel from "../models/user.model.js";

const signUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return res.send({ msg: "Email already exists. please login" });
    }
    const createUser = new userModel({ name, email, password });
    await createUser.save();
    res.status(201).json({ msg: "signup successfull", user: createUser });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
    console.log(error);
  }
};
export default signUp;
