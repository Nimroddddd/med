import express, { urlencoded } from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import providerRoutes from "./routes/providers.routes.js"
import availabilityRoutes from "./routes/availability.routes.js"
import appointmentRoutes from "./routes/appointments.routes.js"
import clientRoutes from "./routes/clients.routes.js"

const port = process.env.PORT
const app = express()

app.use(cors({
  origin: ["http://localhost:5173", "https://healthwisepw.com", "https://www.healthwisepw.com"],
  credentials: true
}))
app.use(urlencoded({ extended: true }))
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/providers", providerRoutes)
app.use("/availability", availabilityRoutes)
app.use("/appointments", appointmentRoutes)
app.use("/clients", clientRoutes)

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
