import express from "express";
import * as googleCalendarController from "../controllers/googleCalendar.controller.js";

const router = express.Router();

// OAuth flow routes - providerId parameter is actually user_id
// IMPORTANT: Put specific routes before parameterized routes
router.get("/oauth/callback", googleCalendarController.handleOAuthCallback);
router.get("/oauth/:providerId", googleCalendarController.startOAuth);

// Calendar management routes - providerId parameter is actually user_id
router.get("/status/:providerId", googleCalendarController.getCalendarStatus);
router.post("/test/:providerId", googleCalendarController.testCalendarConnection);
router.delete("/disconnect/:providerId", googleCalendarController.disconnectCalendar);

export default router;
