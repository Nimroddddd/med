import models from "../models/index.js"
import bcrypt from "bcrypt"

const { User } = models

const register = async (req, res) => {
  const { name, email, password, role } = req.body
  const user = await User.create({
    name,
    email,
    password,
    role
  });
  return res.status(201).json({ message: "Registration Successful", user })
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email }})
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" })
    }
    return res.status(200).json({ messsage: "Login Successful", user})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error."})
  }
}

export { 
  register,
  login
 }