import express from "express";
import * as googleCalendarController from "../controllers/googleCalendar.controller.js";

const router = express.Router();

// OAuth flow routes
router.get("/oauth/:providerId", googleCalendarController.startOAuth);
router.get("/oauth/callback", googleCalendarController.handleOAuthCallback);

// Calendar management routes
router.get("/status/:providerId", googleCalendarController.getCalendarStatus);
router.post("/test/:providerId", googleCalendarController.testCalendarConnection);
router.delete("/disconnect/:providerId", googleCalendarController.disconnectCalendar);

export default router;
