import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Testimonial = sequelize.define("Testimonial", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  feedback: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  show: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  stars: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5
  }
}, 
{
  tableName: "testimonials"
})

export default Testimonial