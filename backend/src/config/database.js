import { Sequelize } from "sequelize";
import env from "dotenv"

env.config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging: false
  }
)

export default sequelize;
