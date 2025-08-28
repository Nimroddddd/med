import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

class GoogleCalendarService {
  constructor() {
    this.oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  // Generate OAuth URL for user to authorize
  generateAuthUrl(providerId) {
    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
      state: providerId // Pass provider ID to identify who's connecting
    });
  }

  // Exchange authorization code for tokens
  async getTokensFromCode(code) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      return tokens;
    } catch (error) {
      console.error('Error getting tokens:', error);
      throw new Error('Failed to get access tokens');
    }
  }

  // Create Google Calendar event
  async createEvent(providerId, appointment, accessToken) {
    try {
      const calendar = google.calendar({ version: 'v3', auth: accessToken });
      
      const event = {
        summary: `Appointment with ${appointment.client_name}`,
        description: `Mental Health Session\n\nClient: ${appointment.client_name}\nPhone: ${appointment.phone}\nEmail: ${appointment.email}\nMessage: ${appointment.message || 'No additional message'}`,
        start: {
          dateTime: new Date(`${appointment.date}T${appointment.time}:00`).toISOString(),
          timeZone: 'America/New_York', // Adjust timezone as needed
        },
        end: {
          dateTime: new Date(`${appointment.date}T${appointment.time}:00`).toISOString(),
          timeZone: 'America/New_York',
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 1 day before
            { method: 'popup', minutes: 60 }, // 1 hour before
          ],
        },
      };

      const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });

      return {
        eventId: response.data.id,
        eventLink: response.data.htmlLink,
        eventData: response.data
      };
    } catch (error) {
      console.error('Error creating Google Calendar event:', error);
      throw new Error('Failed to create calendar event');
    }
  }

  // Update Google Calendar event
  async updateEvent(providerId, appointment, eventId, accessToken) {
    try {
      const calendar = google.calendar({ version: 'v3', auth: accessToken });
      
      const event = {
        summary: `Appointment with ${appointment.client_name}`,
        description: `Mental Health Session\n\nClient: ${appointment.client_name}\nPhone: ${appointment.phone}\nEmail: ${appointment.email}\nMessage: ${appointment.message || 'No additional message'}`,
        start: {
          dateTime: new Date(`${appointment.date}T${appointment.time}:00`).toISOString(),
          timeZone: 'America/New_York',
        },
        end: {
          dateTime: new Date(`${appointment.date}T${appointment.time}:00`).toISOString(),
          timeZone: 'America/New_York',
        },
      };

      const response = await calendar.events.update({
        calendarId: 'primary',
        eventId: eventId,
        resource: event,
      });

      return {
        eventId: response.data.id,
        eventLink: response.data.htmlLink,
        eventData: response.data
      };
    } catch (error) {
      console.error('Error updating Google Calendar event:', error);
      throw new Error('Failed to update calendar event');
    }
  }

  // Delete Google Calendar event
  async deleteEvent(providerId, eventId, accessToken) {
    try {
      const calendar = google.calendar({ version: 'v3', auth: accessToken });
      
      await calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId,
      });

      return { success: true };
    } catch (error) {
      console.error('Error deleting Google Calendar event:', error);
      throw new Error('Failed to delete calendar event');
    }
  }

  // Refresh access token
  async refreshAccessToken(refreshToken) {
    try {
      this.oauth2Client.setCredentials({
        refresh_token: refreshToken
      });

      const { credentials } = await this.oauth2Client.refreshAccessToken();
      return credentials;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw new Error('Failed to refresh access token');
    }
  }
}

export default GoogleCalendarService;
