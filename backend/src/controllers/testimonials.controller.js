import models from "../models/index.js";

const { Testimonial } = models

const getAllTestimonials = async (req, res) => {
  try {
    const { home } = req.query
    const testimonials = await Testimonial.findAll(home ? 
      { where: { show: true }, order: [['createdAt', 'DESC']] } : 
      { where: {}, order: [['createdAt', 'DESC']] }
    );
    return res.status(200).json(testimonials)
  } catch (error) {
    return res.sendStatus(500)
  }
}

const createTestimonial = async (req, res) => {
  try {
    const { name, feedback } = req.body;
    if (!name || !feedback) return res.sendStatus(400)
    const testimonial = await Testimonial.create(req.body)
    return res.status(201).json(testimonial)
  } catch (error) {
    return res.sendStatus(500)
  }
}

const updateTestimonials = async (req, res) => {
  try {
    const { shownIds } = req.body
    await Testimonial.update({ show: false }, { where: {} })
    await Testimonial.update({ show: true },{ where: { id: shownIds } })
    return res.sendStatus(201)
  } catch(error) {
    return res.sendStatus(500)
  }
}


export { getAllTestimonials, createTestimonial, updateTestimonials }