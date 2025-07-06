import models from "../models/index.js";
import { Op } from "sequelize";
import formatDate from "../middlewares/FormatDate.js";

const { Availability, Appointment } = models;

const getAvailability = async (req, res) => {
  try {
    const { id: providerId } = req.params;
    const availability = await Availability.findAll({ where: { provider_id: providerId } });
    return res.status(200).json(availability);
  } catch (error) {
    console.log(formatDate(Date.now()), error);
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
    console.log(formatDate(Date.now()), error.message);
    return res.sendStatus(500);
  }
};

// New endpoint: Get available slots for booking (converts day-based to date-based)
const getAvailableSlots = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    console.log(startDate, endDate, "here")
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

    // 3. Convert day availability to date availability
    const dateAvailability = convertDayToDateAvailability(dayAvailability, startDate, endDate);
        
    // 4. Remove booked slots
    const availableSlots = removeBookedSlots(dateAvailability, appointments);
    
    console.log('Final available slots:', availableSlots);
    
    return res.status(200).json(availableSlots);
  } catch (error) {
    console.log(formatDate(Date.now()), error);
    return res.sendStatus(500);
  }
};

// Helper function: Convert day-based availability to date-based availability
const convertDayToDateAvailability = (dayAvailability, startDate, endDate) => {
  const dateAvailability = {};
  
  // Day mapping: 0=Sunday, 1=Monday, ..., 6=Saturday
  const dayMapping = {
    'sunday': 0,
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
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
    
    // Find all availabilities for this day of the week
    const availableDays = dayAvailability.filter(availability => 
      dayMapping[availability.day] === dayOfWeek
    );
    
    // Merge all time slots for this day (remove duplicates)
    let mergedSlots = [];
    availableDays.forEach(avail => {
      if (Array.isArray(avail.time_slots)) {
        mergedSlots = mergedSlots.concat(avail.time_slots);
      }
    });
    mergedSlots = [...new Set(mergedSlots)]; // Remove duplicates
    
    if (mergedSlots.length > 0) {
      dateAvailability[dateStr] = mergedSlots;
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
    }
  });
  
  return availableSlots;
};

export {
  getAvailability,
  setAvailability,
  getAvailableSlots
};