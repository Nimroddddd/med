import models from "../models/index.js"
import bcrypt from "bcrypt"

const { User, Provider } = models

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
    const user = await User.findOne({ where: { email }, include: { model: Provider, as: "provider" }})
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" })
    }
    return res.status(200).json({ messsage: "Login Successful", user})
  } catch (error) {
    return res.sendStatus(500)
  }
}

export { 
  register,
  login
 }