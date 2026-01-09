import models from "../models/index.js";

const { Client } = models

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll()
    return res.status(200).json(clients)
  } catch (error) {
    return res.sendStatus(500)
  }
}

const getClient = async (req, res) => {
  try {
    const { id } = req.params
    const client = Client.findByPk(id)
    if (!client) {
      return res.status(404).json({ message: "Client not found" })
    }
    return res.status(200).json(client)
  } catch (error) {
    return res.sendStatus(500)
  }
}

export {
  getAllClients,
  getClient
}