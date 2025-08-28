import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Appointment = sequelize.define("Appointment", {
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }, 
  provider_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  time: {
    type: DataTypes.TIME,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "canceled"),
    defaultValue: "pending"
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Google Calendar integration
  google_calendar_event_id: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "appointments"
})

export default Appointment