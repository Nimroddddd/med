import { Router } from "express";
import * as availabilityRoutes from "../controllers/availability.controller.js"

const router = Router()

router.get('/slots', availabilityRoutes.getAvailableSlots);
router.get("/:id", availabilityRoutes.getAvailability)
router.post("/:id", availabilityRoutes.setAvailability)


export default router