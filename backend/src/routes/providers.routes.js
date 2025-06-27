import express from "express";
import * as providerController from "../controllers/providers.controller.js"

const router = express.Router()

router.get("/", providerController.getAllProviders)
router.get("/:id", providerController.getProvider)
router.put("/:id", providerController.updateProvider)
router.post("/", providerController.addProvider)
router.delete("/:id", providerController.deleteProvider)


export default router