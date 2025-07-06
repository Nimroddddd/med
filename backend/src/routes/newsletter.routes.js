import { Router } from "express";
import { subscribeToNewsletter } from "../controllers/newsletter.controller.js";

const router = Router()

router.post("/", subscribeToNewsletter)

export default router