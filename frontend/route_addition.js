// In your routes file (e.g., routes/availability.js), ADD THIS ROUTE:

// Get available slots for booking (date-based) - NEW ENDPOINT
router.get('/slots', getAvailableSlots);

// Your routes file should look like this:
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