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

  // Helper to normalize date/time into ISO string
  getIsoDateTime(dateInput, timeInput) {
    if (!dateInput) throw new Error('Missing date');

    const parseAmPmTo24h = (time) => {
      if (typeof time !== 'string') return null;
      const ampmMatch = time.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
      if (!ampmMatch) return null;
      let hour = parseInt(ampmMatch[1], 10);
      const minute = ampmMatch[2] ? parseInt(ampmMatch[2], 10) : 0;
      const suffix = ampmMatch[3].toUpperCase();
      if (suffix === 'PM' && hour < 12) hour += 12;
      if (suffix === 'AM' && hour === 12) hour = 0;
      return { hour, minute };
    };

    const parseHhMm = (time) => {
      if (typeof time !== 'string') return null;
      const mmMatch = time.trim().match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
      if (!mmMatch) return null;
      const hour = parseInt(mmMatch[1], 10);
      const minute = parseInt(mmMatch[2], 10);
      return { hour, minute };
    };

    let baseDate;
    if (dateInput instanceof Date) {
      baseDate = new Date(dateInput.getTime());
    } else if (typeof dateInput === 'number') {
      baseDate = new Date(dateInput);
    } else if (typeof dateInput === 'string') {
      const s = dateInput.trim();
      if (s.includes('T')) {
        const d = new Date(s);
        if (isNaN(d.getTime())) throw new Error('Invalid date/time');
        baseDate = d;
      } else if (s.includes(' ')) {
        const d = new Date(s.replace(' ', 'T'));
        if (isNaN(d.getTime())) throw new Error('Invalid date/time');
        baseDate = d;
      } else {
        // Date only
        const d = new Date(`${s}T00:00:00`);
        if (isNaN(d.getTime())) throw new Error('Invalid date');
        baseDate = d;
      }
    } else {
      // Fallback to string coercion
      const s = String(dateInput);
      const d = new Date(s.includes('T') ? s : s.replace(' ', 'T'));
      if (isNaN(d.getTime())) throw new Error('Invalid date/time');
      baseDate = d;
    }

    if (timeInput) {
      // Try AM/PM first, then HH:mm
      const ampm = parseAmPmTo24h(timeInput);
      const hhmm = ampm || parseHhMm(timeInput);
      if (hhmm) {
        baseDate.setHours(hhmm.hour, hhmm.minute, 0, 0);
      } else if (typeof timeInput === 'string') {
        // As a last resort, try direct composition
        const t = timeInput.trim();
        const composed = new Date(`${baseDate.toISOString().slice(0, 10)}T${/^\d{1,2}:\d{2}$/.test(t) ? t + ':00' : t}`);
        if (!isNaN(composed.getTime())) {
          baseDate = composed;
        }
      }
    }

    if (isNaN(baseDate.getTime())) throw new Error('Invalid date/time');
    return baseDate.toISOString();
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
      // Set the access token on the OAuth2Client
      this.oauth2Client.setCredentials({
        access_token: accessToken
      });
      
      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

      const startIso = this.getIsoDateTime(appointment.date, appointment.time);
      const startDate = new Date(startIso);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // default 1 hour

      const event = {
        summary: `Appointment with ${appointment.client_name}`,
        description: `Mental Health Session\n\nClient: ${appointment.client_name}\nPhone: ${appointment.phone}\nEmail: ${appointment.email}\nMessage: ${appointment.message || 'No additional message'}`,
        start: {
          dateTime: startDate.toISOString(),
          timeZone: 'America/New_York', // Adjust timezone as needed
        },
        end: {
          dateTime: endDate.toISOString(),
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
      // Set the access token on the OAuth2Client
      this.oauth2Client.setCredentials({
        access_token: accessToken
      });
      
      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

      const startIso = this.getIsoDateTime(appointment.date, appointment.time);
      const startDate = new Date(startIso);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // default 1 hour
      
      const event = {
        summary: `Appointment with ${appointment.client_name}`,
        description: `Mental Health Session\n\nClient: ${appointment.client_name}\nPhone: ${appointment.phone}\nEmail: ${appointment.email}\nMessage: ${appointment.message || 'No additional message'}`,
        start: {
          dateTime: startDate.toISOString(),
          timeZone: 'America/New_York',
        },
        end: {
          dateTime: endDate.toISOString(),
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
      // Set the access token on the OAuth2Client
      this.oauth2Client.setCredentials({
        access_token: accessToken
      });
      
      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
      
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
