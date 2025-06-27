import { Router } from "express";
import * as apppointmentRoutes from "../controllers/appointments.controller.js"

const router = Router()

router.get("/", apppointmentRoutes.getAllAppointments)
router.get("/:id", apppointmentRoutes.getAppointment)
router.post("/", apppointmentRoutes.createAppointment)
router.put("/:id", apppointmentRoutes.updateAppointment)
router.delete("/:id", apppointmentRoutes.deleteAppointment)

export default router