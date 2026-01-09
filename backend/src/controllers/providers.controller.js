import models from "../models/index.js"

const { Provider, User, Availability } = models

const getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.findAll({include: { model: User, as: "user" }})
    return res.status(200).json(providers)
  } catch (error) {
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
    return res.sendStatus(500)
  }
}

const getProviderByLink = async (req, res) => {
  try {
    const { id } = req.params
    const provider = await Provider.findOne({where: {link_id: id}})
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" })
    }
    return res.status(200).json(provider)
  } catch (error) {
    return res.sendStatus(500)
  }
}

const addProvider = async (req, res) => {
  try {
    const { email, name } = req.body
    const user = await User.create(req.body)
    const link_id = name.toLowerCase().replace(/\s+/g, '-')
    const provider = await user.createProvider({ email, name, link_id })
    return res.status(201).json(provider)
  } catch (error) {
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
      credentials,
      linkId: link_id,
      image,
      oldPassword,
      newPassword
    } = req.body
    const { id } = req.params

    const provider = await Provider.findOne({ 
      where: { user_id: id },
      include: [{ model: User, as: "user" }]
    })
    const { user } = provider
  
    const updateData = {}

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (education) updateData.education = education;
    if (bio) updateData.bio = bio
    if (specialties) updateData.specialties = specialties
    if (interests) updateData.interests = interests
    if (credentials) updateData.credentials = credentials
    if (link_id) updateData.link_id = link_id
    if (image) updateData.image = image
    if (newPassword) {
      const verifyPassword = await user.comparePassword(oldPassword) 
      if (!verifyPassword) return res.json({ message: "Incorrect Password" })
      user.password = newPassword
      await user.save()
    }

    const updatedProvider = await provider.update(updateData)
    return res.status(200).json(updatedProvider)
  } catch (error) {
    return res.sendStatus(500)
  }
}

const setProviderPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = await Provider.findByPk(id, { include: { model: User, as: "user" } })
    await user.update(req.body)
    return res.sendStatus(201)
  } catch (error) {
    return res.sendStatus(500)
  }
}

const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params
    const provider = await Provider.findByPk(id, { include: { model: User, as: "user" }})
    if (!provider) return res.status(404).json({ message: "Provider not found" })
    await Availability.destroy({ where: { provider_id: id } })
    await provider.destroy()
    await provider.user.destroy()
    return res.sendStatus(204)
  } catch (error) {
    return res.sendStatus(500)
  }
}

export {
  getAllProviders,
  getProvider,
  addProvider,
  updateProvider,
  deleteProvider,
  getProviderByLink,
  setProviderPassword
}