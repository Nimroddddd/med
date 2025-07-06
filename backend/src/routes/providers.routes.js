import express from "express";
import * as providerController from "../controllers/providers.controller.js"

const router = express.Router()

router.get("/", providerController.getAllProviders)
router.get("/:id", providerController.getProvider)
router.get("/link/:id", providerController.getProviderByLink)
router.put("/:id", providerController.updateProvider)
router.post("/", providerController.addProvider)
router.delete("/:id", providerController.deleteProvider)
router.post("/:id/password", providerController.setProviderPassword)


export default router