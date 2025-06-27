import models from "../models/index.js";

const { sequelize } = models
const args = process.argv.slice(2);
const force = args.includes('--force');
const alter = args.includes('--alter');

const initializeDB = async () => {
  try {
    console.log(`Initializing database... [force: ${force}, alter: ${alter}]`)
    await sequelize.sync({ force, alter })
    console.log('✅ Database synced successfully!');
  } catch (error) {
    console.log(error)
    process.exit(1)
  } finally {
    await sequelize.close()
    console.log("Connection closed")
  }
}

export default initializeDB