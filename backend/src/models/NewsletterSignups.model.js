import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const NewsletterSignups = sequelize.define("NewsletterSignups", {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "newsletter_signups",
  indexes: [{
    unique: true,
    fields: ["email"]
  }]
})

export default NewsletterSignups