import api from './index';

// Get provider availability
export const getAvailability = async (providerId) => {
  const res = await api.get(`/availability/${providerId}`);
  return res.data;
};

// Set provider availability
export const setAvailability = async (providerId, data) => {
  const res = await api.post(`/availability/${providerId}`, data);
  return res.data;
};

// Get available time slots for booking (for clients)
// This converts day-based availability to date-specific availability
export const getAvailableSlots = async (startDate, endDate) => {
  const res = await api.get(`/availability/slots`, {
    params: { startDate, endDate }
  });
  return res.data;
};

// Helper function to convert day-based availability to date-specific availability
// This can be used on the frontend as a fallback or for client-side processing
export const convertDayAvailabilityToDates = (dayAvailability, startDate, endDate) => {
  const availableSlots = {};
  
  // Day mapping: 0=Sunday, 1=Monday, ..., 6=Saturday
  const dayMapping = {
    'thursday': 4,
    'friday': 5, 
    'saturday': 6
  };
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Iterate through each date in the range
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    const dayOfWeek = date.getDay();
    const dateStr = date.toISOString().split('T')[0];
    
    // Check if this day of the week has availability set
    const availableDay = Object.keys(dayAvailability).find(day => 
      dayMapping[day] === dayOfWeek
    );
    
    if (availableDay && dayAvailability[availableDay]) {
      availableSlots[dateStr] = dayAvailability[availableDay];
    }
  }
  
  return availableSlots;
}; 