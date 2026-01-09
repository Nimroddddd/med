import models from "../models/index.js"
import { sendContactMail, sendAppointmentNotificationMail, sendAppointmentConfirmationMail, sendAppointmentCancellationMail, sendAppointmentRejectionMail } from "../utils/sendMail.js"
import GoogleCalendarService from "../services/googleCalendar.service.js"

const { Appointment, Client, Provider } = models
const googleCalendarService = new GoogleCalendarService()

// Helper function to sync appointment with Google Calendar
const syncWithGoogleCalendar = async (appointment, action, providerId = null) => {
  try {
    // If no providerId specified, try to find one (you might need to adjust this logic)
    if (!providerId) {
      // For now, we'll use the first available provider
      // You might want to modify this based on your business logic
      const provider = await Provider.findOne({ where: { google_calendar_connected: true } });
      if (!provider) return; // No connected providers
      providerId = provider.user_id; // Use user_id for consistency
    }

    // Find provider by user_id (since providerId is actually user_id from frontend)
    const provider = await Provider.findOne({ where: { user_id: providerId } });
    if (!provider || !provider.google_calendar_connected) return;

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

    const client = await Client.findByPk(appointment.client_id);
    const appointmentData = {
      client_name: client.name,
      date: appointment.date,
      time: appointment.time,
      phone: appointment.phone || client.phone,
      email: appointment.email || client.email,
      message: appointment.message || ''
    };

    // Use provider.id (actual provider ID) for Google Calendar operations
    switch (action) {
      case 'create':
        if (!appointment.google_calendar_event_id) {
          const eventResult = await googleCalendarService.createEvent(provider.id, appointmentData, accessToken);
          await appointment.update({ google_calendar_event_id: eventResult.eventId });
        }
        break;
      
      case 'update':
        if (appointment.google_calendar_event_id) {
          await googleCalendarService.updateEvent(provider.id, appointmentData, appointment.google_calendar_event_id, accessToken);
        }
        break;
      
      case 'delete':
        if (appointment.google_calendar_event_id) {
          await googleCalendarService.deleteEvent(provider.id, appointment.google_calendar_event_id, accessToken);
          await appointment.update({ google_calendar_event_id: null });
        }
        break;
    }
  } catch (error) {
    console.error('Google Calendar sync error:', error);
    // Don't fail the main operation if Google Calendar sync fails
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    return res.status(200).json(appointments)
  } catch (error) {
    return res.sendStatus(500)
  }
}

const getAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const appointment = await Appointment.findByPk(id)
    return res.status(200).json(appointment)
  } catch (error) {
    return res.sendStatus(500)
  }
}

const createAppointment = async (req, res) => {
  try {
    const { date, time, status, email, phone, name, provider_id } = req.body
    let client
    client = await Client.findOne({ where: {email} })
    if (!client) {
      client = await Client.create({
        name,
        email,
        phone
      })
    }
    const appointment = await Appointment.create({
      date,
      time,
      email,
      phone,
      client_id: client.id,
      provider_id: provider_id || null
    })

    // Note: Google Calendar event will be created when provider accepts the appointment
    // No longer creating calendar event immediately upon appointment request

    // Send notification email to admin
    try {
      await sendAppointmentNotificationMail({
        name: name || client.name,
        email,
        phone,
        date,
        time
      });
    } catch (mailError) {
      // Silent fail for email notification
    }
    return res.status(201).json({ message: "Appointment has been created" })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const updateAppointment = async (req, res) => {
  try {
    const { status } = req.body
    const appointment = await Appointment.findByPk(req.params.id)
    const previousStatus = appointment.status
    appointment.status = status
    await appointment.save()

    // Handle Google Calendar integration based on status change
    if (status === 'confirmed' && previousStatus !== 'confirmed') {
      // Create Google Calendar event when provider accepts the appointment
      if (!appointment.google_calendar_event_id) {
        await syncWithGoogleCalendar(appointment, 'create', appointment.provider_id);
      }
    } else if (status === 'canceled' && appointment.google_calendar_event_id) {
      // Delete Google Calendar event when appointment is canceled
      await syncWithGoogleCalendar(appointment, 'delete', appointment.provider_id);
    } else if (status === 'confirmed' && appointment.google_calendar_event_id) {
      // Update existing Google Calendar event if already exists
      await syncWithGoogleCalendar(appointment, 'update', appointment.provider_id);
    }

    // Send confirmation email if status is confirmed
    if (status === 'confirmed') {
      try {
        await sendAppointmentConfirmationMail({
          name: appointment.name || 'Valued Client',
          email: appointment.email,
          date: appointment.date,
          time: appointment.time
        });
      } catch (mailError) {
        // Silent fail for email
      }
    }
    // Send cancellation email if status is canceled
    if (status === 'canceled') {
      try {
        await sendAppointmentCancellationMail({
          name: appointment.name || 'Valued Client',
          email: appointment.email,
          date: appointment.date,
          time: appointment.time,
          reason: req.body.reason,
          additionalNotes: req.body.additionalNotes
        });
      } catch (mailError) {
        // Silent fail for email
      }
    }
    // Send rejection email if status is rejected
    if (status === 'rejected') {
      try {
        await sendAppointmentRejectionMail({
          name: appointment.name || 'Valued Client',
          email: appointment.email,
          date: appointment.date,
          time: appointment.time,
          reason: req.body.reason,
          additionalNotes: req.body.additionalNotes
        });
      } catch (mailError) {
        // Silent fail for email
      }
    }
    return res.status(201).json({ message: "Appointment status has been updated" })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id)
    
    // Sync with Google Calendar before deletion
    await syncWithGoogleCalendar(appointment, 'delete', appointment.provider_id);
    
    await appointment.destroy()
    return res.sendStatus(204)
  } catch (error) {
    return res.sendStatus(500)
  }
}

export {
  getAllAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
}