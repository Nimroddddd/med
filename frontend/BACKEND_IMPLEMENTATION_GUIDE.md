# Backend Implementation Guide

## Overview

This guide helps you implement the new `getAvailableSlots` endpoint that converts day-based availability to date-specific availability for client booking.

## Files to Update/Create

### 1. Update Your Availability Controller

Replace your current controller with the complete implementation:

```javascript
// controllers/availabilityController.js
import models from "../models/index.js";

const { Availability, Appointment } = models;

const getAvailability = async (req, res) => {
  try {
    const { id: providerId } = req.params;
    const availability = await Availability.findAll({ where: { provider_id: providerId } });
    return res.status(200).json(availability);
  } catch (error) {
    console.log(error);
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

// NEW ENDPOINT: Get available slots for booking
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
          [models.Sequelize.Op.between]: [startDate, endDate]
        }
      },
      attributes: ['date', 'time']
    });

    // 3. Convert day availability to date availability
    const dateAvailability = convertDayToDateAvailability(dayAvailability, startDate, endDate);
    
    // 4. Remove booked slots
    const availableSlots = removeBookedSlots(dateAvailability, appointments);
    
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
    const date = appointment.date;
    if (!bookedSlotsByDate[date]) {
      bookedSlotsByDate[date] = [];
    }
    bookedSlotsByDate[date].push(appointment.time);
  });
  
  // Remove booked slots from available slots
  Object.keys(availableSlots).forEach(date => {
    if (bookedSlotsByDate[date]) {
      availableSlots[date] = availableSlots[date].filter(
        slot => !bookedSlotsByDate[date].includes(slot)
      );
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
```

### 2. Update Your Routes

Add the new route to your availability routes:

```javascript
// routes/availability.js
import express from 'express';
import { getAvailability, setAvailability, getAvailableSlots } from '../controllers/availabilityController.js';

const router = express.Router();

// Get provider availability (day-based)
router.get('/:id', getAvailability);

// Set provider availability (day-based)
router.post('/:id', setAvailability);

// Get available slots for booking (date-based) - NEW ENDPOINT
router.get('/slots', getAvailableSlots);

export default router;
```

### 3. Update Your Main App File

Make sure the route is properly registered:

```javascript
// app.js or index.js
import availabilityRoutes from './routes/availability.js';

// ... other imports and middleware

app.use('/api/availability', availabilityRoutes);
```

## API Endpoints

### 1. Get Provider Availability (Existing)
```
GET /api/availability/:providerId
```
Returns day-based availability for a specific provider.

### 2. Set Provider Availability (Existing)
```
POST /api/availability/:providerId
Body: { "thursday": ["07:00", "08:00"], "friday": ["09:00", "10:00"] }
```
Sets day-based availability for a provider.

### 3. Get Available Slots (NEW)
```
GET /api/availability/slots?startDate=2024-01-15&endDate=2024-01-21
```
Returns date-specific available slots for booking.

**Response Example:**
```json
{
  "2024-01-18": ["07:00", "08:00", "09:00", "10:00"],
  "2024-01-19": ["07:00", "08:00", "09:00"],
  "2024-01-20": ["07:00", "08:00", "09:00", "10:00", "11:00"]
}
```

## Database Requirements

Make sure your models have the correct structure:

### Availability Model
```javascript
// Should have these fields:
- id (primary key)
- provider_id (foreign key)
- day (string: 'thursday', 'friday', 'saturday')
- time_slots (array of strings: ['07:00', '08:00', ...])
```

### Appointment Model
```javascript
// Should have these fields:
- id (primary key)
- date (date: '2024-01-18')
- time (string: '09:00')
- client information...
```

## Testing the Implementation

### 1. Test the New Endpoint

```bash
# Test with curl
curl "http://localhost:3000/api/availability/slots?startDate=2024-01-15&endDate=2024-01-21"
```

### 2. Test with Sample Data

First, set some availability:
```bash
curl -X POST http://localhost:3000/api/availability/1 \
  -H "Content-Type: application/json" \
  -d '{
    "thursday": ["07:00", "08:00", "09:00", "10:00"],
    "friday": ["07:00", "08:00", "09:00"],
    "saturday": ["07:00", "08:00", "09:00", "10:00", "11:00"]
  }'
```

Then test the slots endpoint:
```bash
curl "http://localhost:3000/api/availability/slots?startDate=2024-01-15&endDate=2024-01-21"
```

### 3. Expected Results

For the date range Jan 15-21, 2024:
- Jan 15 (Monday): No availability
- Jan 16 (Tuesday): No availability
- Jan 17 (Wednesday): No availability
- Jan 18 (Thursday): Available slots
- Jan 19 (Friday): Available slots
- Jan 20 (Saturday): Available slots
- Jan 21 (Sunday): No availability

## Error Handling

The implementation includes:

1. **Input validation**: Checks for required startDate and endDate
2. **Database error handling**: Catches and logs database errors
3. **Date validation**: Handles invalid date ranges
4. **Empty results**: Returns empty object if no availability

## Performance Considerations

1. **Indexing**: Add indexes on `provider_id` and `date` fields
2. **Caching**: Consider caching availability data for frequently requested date ranges
3. **Pagination**: For large date ranges, consider implementing pagination
4. **Query optimization**: Use specific attributes in queries to reduce data transfer

## Troubleshooting

### Common Issues:

1. **Route not found**: Check that the route is properly registered in your main app
2. **Database errors**: Verify your models are correctly defined
3. **Date format issues**: Ensure dates are in YYYY-MM-DD format
4. **CORS issues**: If testing from frontend, ensure CORS is configured

### Debug Steps:

1. Check server logs for errors
2. Test endpoints individually with Postman or curl
3. Verify database connections and model relationships
4. Test with simple date ranges first

## Next Steps

After implementing this backend solution:

1. **Test thoroughly** with various date ranges
2. **Update your frontend** to use the new endpoint
3. **Add error handling** for edge cases
4. **Consider adding caching** for better performance
5. **Monitor usage** and optimize as needed

This implementation provides a solid foundation for connecting day-based availability with date-specific booking! 