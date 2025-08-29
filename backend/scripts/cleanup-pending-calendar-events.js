import sequelize from "../src/config/database.js";
import models from "../src/models/index.js";
import GoogleCalendarService from "../src/services/googleCalendar.service.js";

const { Appointment, Provider } = models;
const googleCalendarService = new GoogleCalendarService();

/**
 * Migration script to clean up Google Calendar events for pending appointments
 * This should be run after implementing the new calendar sync behavior
 * where events are only created when appointments are confirmed
 */
const cleanupPendingCalendarEvents = async () => {
  try {
    console.log('Starting cleanup of pending appointment calendar events...');

    // Find all pending appointments that have calendar event IDs
    const pendingAppointmentsWithEvents = await Appointment.findAll({
      where: {
        status: 'pending',
        google_calendar_event_id: {
          [sequelize.Op.ne]: null
        }
      },
      include: [{
        model: Provider,
        required: true,
        where: {
          google_calendar_connected: true
        }
      }]
    });

    console.log(`Found ${pendingAppointmentsWithEvents.length} pending appointments with calendar events`);

    let deletedCount = 0;
    let errorCount = 0;

    for (const appointment of pendingAppointmentsWithEvents) {
      try {
        const provider = appointment.Provider;
        
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

        // Delete the calendar event
        await googleCalendarService.deleteEvent(
          provider.id, 
          appointment.google_calendar_event_id, 
          accessToken
        );

        // Clear the calendar event ID from the appointment
        await appointment.update({ google_calendar_event_id: null });

        console.log(`✓ Deleted calendar event for appointment ${appointment.id}`);
        deletedCount++;

      } catch (error) {
        console.error(`✗ Failed to delete calendar event for appointment ${appointment.id}:`, error.message);
        errorCount++;
        
        // Still clear the event ID even if deletion failed (event might not exist)
        await appointment.update({ google_calendar_event_id: null });
      }
    }

    console.log('\nCleanup completed:');
    console.log(`- Successfully processed: ${deletedCount}`);
    console.log(`- Errors encountered: ${errorCount}`);
    console.log(`- Total processed: ${pendingAppointmentsWithEvents.length}`);

    if (errorCount > 0) {
      console.log('\nNote: Some calendar events could not be deleted, but the event IDs have been cleared from the database.');
      console.log('This is normal if the events were already deleted manually or if there were authentication issues.');
    }

  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
};

// Run the migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanupPendingCalendarEvents()
    .then(() => {
      console.log('\nMigration completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\nMigration failed:', error);
      process.exit(1);
    });
}

export default cleanupPendingCalendarEvents;
