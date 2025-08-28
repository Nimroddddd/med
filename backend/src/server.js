import express, { urlencoded } from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import providerRoutes from "./routes/providers.routes.js"
import availabilityRoutes from "./routes/availability.routes.js"
import appointmentRoutes from "./routes/appointments.routes.js"
import clientRoutes from "./routes/clients.routes.js"
import contactRoutes from "./routes/contact.routes.js"
import testimonialRoutes from "./routes/testimonials.routes.js"
import newsLetterRoutes from "./routes/newsletter.routes.js"
import googleCalendarRoutes from "./routes/googleCalendar.routes.js"

const port = process.env.PORT
const app = express()

app.use(cors({
  origin: ["http://localhost:5173", "https://healthwisepw.com", "https://www.healthwisepw.com"],
  credentials: true
}))
app.use(urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
  return res.json({message: "Welcome to healthwise api."})
})

app.use("/auth", authRoutes)
app.use("/providers", providerRoutes)
app.use("/availability", availabilityRoutes)
app.use("/appointments", appointmentRoutes)
app.use("/clients", clientRoutes)
app.use("/contact", contactRoutes)
app.use("/testimonials", testimonialRoutes)
app.use("/newsletter", newsLetterRoutes)
app.use("/google-calendar", googleCalendarRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

export default app;
