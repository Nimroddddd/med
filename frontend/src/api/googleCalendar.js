import api from './index';

// Google Calendar OAuth and management API calls
export const googleCalendarApi = {
  // Start OAuth flow - get authorization URL
  startOAuth: async (providerId) => {
    const response = await api.get(`/google-calendar/oauth/${providerId}`);
    return response.data;
  },

  // Get calendar connection status
  getCalendarStatus: async (providerId) => {
    const response = await api.get(`/google-calendar/status/${providerId}`);
    return response.data;
  },

  // Test calendar connection
  testCalendarConnection: async (providerId) => {
    const response = await api.post(`/google-calendar/test/${providerId}`);
    return response.data;
  },

  // Disconnect Google Calendar
  disconnectCalendar: async (providerId) => {
    const response = await api.delete(`/google-calendar/disconnect/${providerId}`);
    return response.data;
  }
};

export default googleCalendarApi;
