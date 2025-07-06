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
  }
}, {
  tableName: "providers",
  timestamps: false
}) 

export default Provider;