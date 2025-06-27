import readline from "readline"
import models from "../src/models/index.js";

const { User } = models

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function prompt (question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function createSuperAdmin() {
  try {
    console.log("This will create a Super admin\n")
    const email = await prompt("Email: ")
    const password = await prompt("Password: ")
    const name = await prompt("Full name: ")
    const user = await User.create({
      email,
      name,
      password,
      role: "superadmin"
    })
    console.log("Super admin has been successfully created! you may now login with the credentials.")
    await new Promise(resolve => setTimeout(resolve, 100)); // 👈 add this short delay
  } catch (error) {
    console.log(error)
  } finally {
    rl.close()
  }
}

createSuperAdmin()