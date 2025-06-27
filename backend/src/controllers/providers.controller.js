import models from "../models/index.js"
import formatDate from "../middlewares/FormatDate.js"

const { Provider, User } = models

const getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.findAll()
    return res.status(200).json(providers)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getProvider = async (req, res) => {
  try {
    const { id } = req.params
    const provider = await Provider.findOne({where: {user_id: id}})
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" })
    }
    return res.status(200).json(provider)
  } catch (error) {
    console.log(formatDate(Date.now()), error.message)
    return res.sendStatus(500)
  }
}

const addProvider = async (req, res) => {
  try {
    const { email, name } = req.body
    const user = await User.create(req.body)
    await Provider.create({
      email,
      name,
      user_id: user.id
    })
    return res.status(201).json(user)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const updateProvider = async (req, res) => {
  try {
    const {
      name,
      email,
      education,
      bio,
      specialties,
      interests,
      credentials
    } = req.body
    const { id } = req.params

    const provider = await Provider.findOne({ where: { user_id: id } })
    const updateData = {}

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (education) updateData.education = education;
    if (bio) updateData.bio = bio
    if (specialties) updateData.specialties = specialties
    if (interests) updateData.interests = interests
    if (credentials) update.Data.credentials = credentials

    const updatedProvider = await provider.update(updateData)
    return res.status(200).json(updatedProvider)
  } catch (error) {
    return res.sendStatus(500)
  }
}

const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params
    const provider = await Provider.findByPk(id)
    if (!provider) return res.status(404).json({ message: "Provider not found" })
    await provider.destroy()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
}

export {
  getAllProviders,
  getProvider,
  addProvider,
  updateProvider,
  deleteProvider
}