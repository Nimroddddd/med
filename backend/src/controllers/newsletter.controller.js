import models from "../models/index.js";

const { NewsletterSignups } = models

const subscribeToNewsletter = async (req, res) => {
  try {
    const signup = await NewsletterSignups.upsert(req.body)
    return res.status(201).json(signup)
  } catch (error) {
    return res.sendStatus(500)
  }
}

export {
  subscribeToNewsletter
}