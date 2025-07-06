import models from "../models/index.js";
import formatDate from "../middlewares/FormatDate.js"

const { NewsletterSignups } = models

const subscribeToNewsletter = async (req, res) => {
  try {
    const signup = await NewsletterSignups.upsert(req.body)
    return res.status(201).json(signup)
  } catch (error) {
    console.log(formatDate(Date.now()), error)
    return res.sendStatus(500)
  }
}

export {
  subscribeToNewsletter
}