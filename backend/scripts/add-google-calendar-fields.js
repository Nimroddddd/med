import sequelize from "../src/config/database.js";
import { DataTypes } from "sequelize";

const addGoogleCalendarFields = async () => {
  try {
    console.log('Starting Google Calendar fields migration...');

    // Add fields to providers table
    await sequelize.query(`
      ALTER TABLE providers 
      ADD COLUMN IF NOT EXISTS google_calendar_id VARCHAR(255),
      ADD COLUMN IF NOT EXISTS google_calendar_access_token TEXT,
      ADD COLUMN IF NOT EXISTS google_calendar_refresh_token TEXT,
      ADD COLUMN IF NOT EXISTS google_calendar_expiry TIMESTAMP,
      ADD COLUMN IF NOT EXISTS google_calendar_connected BOOLEAN DEFAULT FALSE
    `);

    // Add fields to appointments table
    await sequelize.query(`
      ALTER TABLE appointments 
      ADD COLUMN IF NOT EXISTS google_calendar_event_id VARCHAR(255)
    `);

    console.log('✅ Google Calendar fields added successfully!');
    console.log('\nNew fields added:');
    console.log('- providers.google_calendar_id');
    console.log('- providers.google_calendar_access_token');
    console.log('- providers.google_calendar_refresh_token');
    console.log('- providers.google_calendar_expiry');
    console.log('- providers.google_calendar_connected');
    console.log('- appointments.google_calendar_event_id');

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await sequelize.close();
  }
};

// Run migration
addGoogleCalendarFields();
