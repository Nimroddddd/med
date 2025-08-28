import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Provider = sequelize.define("Provider", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  education: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  credentials: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  bio: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  specialties: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  interests: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  link_id: {
    type: DataTypes.STRING,
  },
  // Google Calendar integration fields
  google_calendar_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  google_calendar_access_token: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  google_calendar_refresh_token: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  google_calendar_expiry: {
    type: DataTypes.DATE,
    allowNull: true
  },
  google_calendar_connected: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: "providers",
  timestamps: false
}) 

export default Provider;