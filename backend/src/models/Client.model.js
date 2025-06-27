import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Client = sequelize.define("Client", {
  name: {
    type: DataTypes.STRING,
    allowNull: false  
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "clients"
})

export default Client