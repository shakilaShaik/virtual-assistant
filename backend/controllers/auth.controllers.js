const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body
    
    const existEmail = await User.findOne({ email })
    if (existEmail) {
      return res.status(400).json({ message: "email already exists" })
    }
    if (password.length < 6) {
    return res.status(400).json({message:"password must be greater than 6"})
    }
    
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name, password: hashPassword,email
    })
  }
 


  catch(error) {
    return res.json("")
  }
}