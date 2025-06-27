import express from "express";
import * as clientController from "../controllers/clients.controller.js"

const router = express.Router()

router.get("/", clientController.getAllClients)
router.get("/:id", clientController.getClient)

export default router