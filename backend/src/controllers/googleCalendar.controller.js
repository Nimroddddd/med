import models from "../models/index.js";
import GoogleCalendarService from "../services/googleCalendar.service.js";

const { Provider, User } = models;
const googleCalendarService = new GoogleCalendarService();

// Start OAuth flow - generate authorization URL
// Note: providerId parameter is actually user_id from frontend
export const startOAuth = async (req, res) => {
  try {
    const { providerId } = req.params; // This is actually user_id
    
    // Find provider by user_id (since frontend sends user ID)
    const provider = await Provider.findOne({ where: { user_id: providerId } });
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    // Generate OAuth URL using the actual provider.id
    const authUrl = googleCalendarService.generateAuthUrl(provider.id);
    
    res.json({ 
      authUrl,
      message: "Redirect user to this URL to authorize Google Calendar access"
    });
  } catch (error) {
    console.error('Error starting OAuth flow:', error);
    res.status(500).json({ message: "Failed to start OAuth flow" });
  }
};

// OAuth callback - handle authorization code
export const handleOAuthCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    
    if (!code || !state) {
      return res.status(400).json({ message: "Missing authorization code or state" });
    }

    const providerId = state; // This is the actual provider.id from OAuth state
    
    // Verify provider exists
    const provider = await Provider.findByPk(providerId);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    // Exchange code for tokens
    const tokens = await googleCalendarService.getTokensFromCode(code);
    
    // Update provider with Google Calendar tokens
    await provider.update({
      google_calendar_access_token: tokens.access_token,
      google_calendar_refresh_token: tokens.refresh_token,
      google_calendar_expiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
      google_calendar_connected: true
    });

    // Redirect back to the portal after successful connection
    // Read base portal URL from env var with a safe default
    const basePortalUrl = process.env.PORTAL_REDIRECT_URL || 'https://healthwise.com/owner-portal';
    // Append success params
    const separator = basePortalUrl.includes('?') ? '&' : '?';
    const redirectUrl = `${basePortalUrl}${separator}oauth=google_calendar&status=success`;
    return res.redirect(302, redirectUrl);
  } catch (error) {
    console.error('Error handling OAuth callback:', error);
    res.status(500).json({ message: "Failed to complete OAuth flow" });
  }
};

// Disconnect Google Calendar
// Note: providerId parameter is actually user_id from frontend
export const disconnectCalendar = async (req, res) => {
  try {
    const { providerId } = req.params; // This is actually user_id
    
    // Find provider by user_id (since frontend sends user ID)
    const provider = await Provider.findOne({ where: { user_id: providerId } });
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    // Clear Google Calendar tokens
    await provider.update({
      google_calendar_access_token: null,
      google_calendar_refresh_token: null,
      google_calendar_expiry: null,
      google_calendar_connected: false
    });

    res.json({ 
      message: "Google Calendar disconnected successfully",
      provider: {
        id: provider.id,
        name: provider.name,
        google_calendar_connected: provider.google_calendar_connected
      }
    });
  } catch (error) {
    console.error('Error disconnecting calendar:', error);
    res.status(500).json({ message: "Failed to disconnect calendar" });
  }
};

// Get calendar connection status
// Note: providerId parameter is actually user_id from frontend
export const getCalendarStatus = async (req, res) => {
  try {
    const { providerId } = req.params; // This is actually user_id
    
    // Find provider by user_id (since frontend sends user ID)
    const provider = await Provider.findOne({ where: { user_id: providerId } });
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.json({
      provider: {
        id: provider.id,
        name: provider.name,
        google_calendar_connected: provider.google_calendar_connected,
        google_calendar_expiry: provider.google_calendar_expiry
      }
    });
  } catch (error) {
    console.error('Error getting calendar status:', error);
    res.status(500).json({ message: "Failed to get calendar status" });
  }
};

// Test calendar connection
// Note: providerId parameter is actually user_id from frontend
export const testCalendarConnection = async (req, res) => {
  try {
    const { providerId } = req.params; // This is actually user_id
    
    // Find provider by user_id (since frontend sends user ID)
    const provider = await Provider.findOne({ where: { user_id: providerId } });
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    if (!provider.google_calendar_connected) {
      return res.status(400).json({ message: "Google Calendar not connected" });
    }

    // Check if token is expired and refresh if needed
    let accessToken = provider.google_calendar_access_token;
    
    if (provider.google_calendar_expiry && new Date() > provider.google_calendar_expiry) {
      const newTokens = await googleCalendarService.refreshAccessToken(provider.google_calendar_refresh_token);
      
      await provider.update({
        google_calendar_access_token: newTokens.access_token,
        google_calendar_expiry: newTokens.expiry_date ? new Date(newTokens.expiry_date) : null
      });
      
      accessToken = newTokens.access_token;
    }

    // Try to create a test event (will be deleted immediately)
    const testAppointment = {
      client_name: "Test Connection",
      date: new Date().toISOString().split('T')[0],
      time: "12:00",
      phone: "Test",
      email: "test@test.com",
      message: "Test connection"
    };

    const eventResult = await googleCalendarService.createEvent(provider.id, testAppointment, accessToken);
    
    // Delete the test event
    await googleCalendarService.deleteEvent(provider.id, eventResult.eventId, accessToken);

    res.json({ 
      message: "Calendar connection test successful",
      testEvent: eventResult
    });
  } catch (error) {
    console.error('Error testing calendar connection:', error);
    res.status(500).json({ message: "Calendar connection test failed", error: error.message });
  }
};
