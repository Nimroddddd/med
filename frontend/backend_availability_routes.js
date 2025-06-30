import express from 'express';
import { getAvailability, setAvailability, getAvailableSlots } from './availabilityController.js';

const router = express.Router();

// Get provider availability (day-based)
router.get('/:id', getAvailability);

// Set provider availability (day-based)
router.post('/:id', setAvailability);

// Get available slots for booking (date-based) - NEW ENDPOINT
router.get('/slots', getAvailableSlots);

export default router; 
