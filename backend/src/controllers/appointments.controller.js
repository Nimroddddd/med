import models from "../models/index.js"
import formatDate from "../middlewares/FormatDate.js"
import { sendContactMail, sendAppointmentNotificationMail, sendAppointmentConfirmationMail } from "../utils/sendMail.js"

const { Appointment, Client } = models

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    return res.status(200).json(appointments)
  } catch (error) {
    console.log(formatDate(Date.now()), error)
    return res.sendStatus(500)
  }
}

const getAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const appointment = await Appointment.findByPk(id)
    return res.status(200).json(appointment)
  } catch (error) {
    console.log(formatDate(Date.now()), error)
    return res.sendStatus(500)
  }
}

const createAppointment = async (req, res) => {
  try {
    const { date, time, status, email, phone, name } = req.body
    let client
    client = await Client.findOne({ where: {email} })
    if (!client) {
      client = await Client.create({
        name,
        email,
        phone
      })
    }
    const appointment = await Appointment.create({
      date,
      time,
      email,
      phone,
      client_id: client.id
    })
    // Send notification email to admin
    try {
      await sendAppointmentNotificationMail({
        name: name || client.name,
        email,
        phone,
        date,
        time
      });
      console.log(name, email, phone, date, time)
    } catch (mailError) {
      console.log(formatDate(Date.now()), 'Failed to send appointment notification email:', mailError)
    }
    return res.status(201).json({ message: "Appointment has been created" })
  } catch (error) {
    console.log(formatDate(Date.now()), error)
    return res.sendStatus(500)
  }
}

const updateAppointment = async (req, res) => {
  try {
    const { status } = req.body
    console.log(status)
    const appointment = await Appointment.findByPk(req.params.id)
    appointment.status = status
    await appointment.save()
    // Send confirmation email if status is confirmed
    if (status === 'confirmed') {
      try {
        await sendAppointmentConfirmationMail({
          name: appointment.name || 'Valued Client',
          email: appointment.email,
          date: appointment.date,
          time: appointment.time
        });
      } catch (mailError) {
        console.log(formatDate(Date.now()), 'Failed to send confirmation email:', mailError)
      }
    }
    return res.status(201).json({ message: "Appointment status has been updated" })
  } catch (error) {
    console.log(formatDate(Date.now()), error)
    return res.sendStatus(500)
  }
}

const deleteAppointment = async (req, res) => {
  try {
    const appointment = Appointment.findByPk(req.params.id)
    await appointment.destroy()
    return res.sendStatus(204)
  } catch (error) {
    console.log(formatDate(Date.now()), error)
    return res.sendStatus(500)
  }
}

export {
  getAllAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
}