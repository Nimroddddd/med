import { Router } from "express";
import { getAllTestimonials, createTestimonial, updateTestimonials } from "../controllers/testimonials.controller.js"

const router = Router()

router.get("/", getAllTestimonials)
router.post("/", createTestimonial)
router.put("/show", updateTestimonials)


export default router