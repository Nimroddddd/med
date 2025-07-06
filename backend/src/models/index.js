import sequelize from "../config/database.js";
import { Sequelize, DataTypes } from "sequelize"
import Appointment from "./Appointment.model.js";
import Availability from "./Availability.model.js";
import Client from "./Client.model.js";
import User from "./User.model.js";
import Provider from "./Provider.model.js";
import Testimonial from "./Testimonials.model.js";
import NewsletterSignups from "./NewsletterSignups.model.js";



Provider.hasMany(Appointment, { foreignKey: "provider_id" })
Client.hasMany(Appointment, { foreignKey: "client_id" })
Provider.hasMany(Availability, { foreignKey: "provider_id" })
Availability.belongsTo(Provider, { foreignKey: "provider_id" })
User.hasOne(Provider, { foreignKey: "user_id", as: "provider" })
Provider.belongsTo(User, { foreignKey: "user_id", as: "user" })



export default {
  sequelize,
  Appointment,
  Availability,
  User,
  Client,
  Provider,
  Testimonial,
  NewsletterSignups
}