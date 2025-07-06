import nodemailer from "nodemailer";

export async function sendContactMail({ name, email, phone, message }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2 style="color: #1a3c34;">New Contact Message from Healthwise Website</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">Full Name:</td>
          <td style="padding: 8px;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Email Address:</td>
          <td style="padding: 8px;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Phone Number:</td>
          <td style="padding: 8px;">${phone || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Message:</td>
          <td style="padding: 8px;">${message}</td>
        </tr>
      </table>
      <p style="margin-top: 24px; color: #888;">This message was sent from the Healthwise Psychiatry & Wellness website contact form.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Healthwise Website" <${process.env.SMTP_USER}>`,
    to: "info@healthwisepw.com",
    subject: "New Contact Form Submission",
    html,
  });
}

export async function sendAppointmentNotificationMail({ name, email, phone, date, time }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2 style="color: #1a3c34;">New Appointment Request</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">Full Name:</td>
          <td style="padding: 8px;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Email Address:</td>
          <td style="padding: 8px;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Phone Number:</td>
          <td style="padding: 8px;">${phone || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Requested Date:</td>
          <td style="padding: 8px;">${date}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Requested Time:</td>
          <td style="padding: 8px;">${time}</td>
        </tr>
      </table>
      <p style="margin-top: 24px; color: #888;">Please log in to your provider portal on the Healthwise website to accept or manage this appointment request.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Healthwise Website" <${process.env.SMTP_USER}>`,
    to: "info@healthwise.com",
    subject: "New Appointment Request Submitted",
    html,
  });
}

export async function sendAppointmentConfirmationMail({ name, email, date, time }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2 style="color: #1a3c34;">Your Appointment is Confirmed</h2>
      <p>Dear ${name || 'Client'},</p>
      <p>Your appointment has been <b>confirmed</b>!</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">Date:</td>
          <td style="padding: 8px;">${date}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Time:</td>
          <td style="padding: 8px;">${time}</td>
        </tr>
      </table>
      <p style="margin-top: 24px;">Thank you for choosing Healthwise Psychiatry & Wellness. We look forward to seeing you!</p>
      <p style="color: #888;">If you have any questions, please reply to this email or contact our office.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Healthwise Website" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Appointment is Confirmed",
    html,
  });
} 