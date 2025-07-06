import { Sequelize } from "sequelize";
import env from "dotenv"
import pg from "pg"

env.config()

const isLocal = process.env.DB_HOST === 'localhost';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: isLocal ? {} : {
      ssl: {
        require: true,
        rejectUnauthorized: false // for dev; use true + CA cert in production
      }
    }
  }
)

export default sequelize;
