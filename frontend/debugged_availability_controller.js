import models from "../models/index.js";
import { Op } from "sequelize";

const { Availability, Appointment } = models;

const getAvailability = async (req, res) => {
  try {
    const { id: providerId } = req.params;
    const availability = await Availability.findAll({ where: { provider_id: providerId } });
    return res.status(200).json(availability);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
};

const setAvailability = async (req, res) => {
  try {
    const data = req.body;
    const { id: provider_id } = req.params;
    for (const [day, timeSlots] of Object.entries(data)) {
      await Availability.upsert({
        day,
        time_slots: timeSlots,
        provider_id
      });
    }
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

// New endpoint: Get available slots for booking (converts day-based to date-based)
const getAvailableSlots = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ 
        message: 'startDate and endDate are required' 
      });
    }

    // 1. Get all provider availability (day-based)
    const dayAvailability = await Availability.findAll();
    
    // 2. Get existing appointments in the date range
    const appointments = await Appointment.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate]
        }
      },
      attributes: ['date', 'time']
    });

    console.log('Found appointments:', appointments.map(a => ({ date: a.date, time: a.time })));

    // 3. Convert day availability to date availability
    const dateAvailability = convertDayToDateAvailability(dayAvailability, startDate, endDate);
    
    console.log('Date availability before removing booked slots:', dateAvailability);
    
    // 4. Remove booked slots
    const availableSlots = removeBookedSlots(dateAvailability, appointments);
    
    console.log('Final available slots:', availableSlots);
    
    return res.status(200).json(availableSlots);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

// Helper function: Convert day-based availability to date-based availability
const convertDayToDateAvailability = (dayAvailability, startDate, endDate) => {
  const dateAvailability = {};
  
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
    
    // Find which day of the week this date corresponds to
    const availableDay = dayAvailability.find(availability => 
      dayMapping[availability.day] === dayOfWeek
    );
    
    if (availableDay && availableDay.time_slots) {
      dateAvailability[dateStr] = availableDay.time_slots;
    }
  }
  return dateAvailability;
};

// Helper function: Remove booked slots from available slots
const removeBookedSlots = (dateAvailability, appointments) => {
  const availableSlots = { ...dateAvailability };
  
  // Group appointments by date
  const bookedSlotsByDate = {};
  appointments.forEach(appointment => {
    // Ensure date is in YYYY-MM-DD format
    const date = typeof appointment.date === 'string' 
      ? appointment.date 
      : appointment.date.toISOString().split('T')[0];
    
    // Normalize time to HH:MM format (remove seconds)
    const time = appointment.time.split(':').slice(0, 2).join(':');
    
    if (!bookedSlotsByDate[date]) {
      bookedSlotsByDate[date] = [];
    }
    bookedSlotsByDate[date].push(time);
  });
  
  console.log('Booked slots by date:', bookedSlotsByDate);
  
  // Remove booked slots from available slots
  Object.keys(availableSlots).forEach(date => {
    if (bookedSlotsByDate[date]) {
      const originalSlots = [...availableSlots[date]];
      availableSlots[date] = availableSlots[date].filter(
        slot => !bookedSlotsByDate[date].includes(slot)
      );
      
      if (originalSlots.length !== availableSlots[date].length) {
        console.log(`Removed booked slots for ${date}:`, {
          original: originalSlots,
          booked: bookedSlotsByDate[date],
          remaining: availableSlots[date]
        });
      }
    }
  });
  
  // Remove dates with no available slots
  Object.keys(availableSlots).forEach(date => {
    if (availableSlots[date].length === 0) {
      delete availableSlots[date];
      console.log(`Removed date ${date} - no available slots`);
    }
  });
  
  return availableSlots;
};

export {
  getAvailability,
  setAvailability,
  getAvailableSlots
}; 