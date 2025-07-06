import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Availability = sequelize.define("Availability", {
  day: {
    type: DataTypes.ENUM("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"),
    allowNull: false
  },
  time_slots: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  }
}, {
  tableName: "availability",
  indexes: [{
    unique: true,
    fields: ["day", "provider_id"]
  }]
})

export default Availability