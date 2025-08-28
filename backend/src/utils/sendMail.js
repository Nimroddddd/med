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
    to: "info@healthwisepw.com",
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

  // Format date as YYYY-MM-DD (no time zone)
  let displayDate = date;
  if (typeof date === 'string' && date.length >= 10) {
    displayDate = date.slice(0, 10); // e.g., '2025-08-01'
  } else if (date instanceof Date) {
    displayDate = date.toISOString().slice(0, 10);
  }
  const displayTime = time;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2 style="color: #1a3c34;">Your Appointment is Confirmed</h2>
      <p>Dear ${name || 'Client'},</p>
      <p>Your appointment has been <b>confirmed</b>!</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">Date:</td>
          <td style="padding: 8px;">${displayDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Time:</td>
          <td style="padding: 8px;">${displayTime}</td>
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

export async function sendAppointmentCancellationMail({ name, email, date, time, reason, additionalNotes }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Format date as YYYY-MM-DD (no time zone)
  let displayDate = date;
  if (typeof date === 'string' && date.length >= 10) {
    displayDate = date.slice(0, 10);
  } else if (date instanceof Date) {
    displayDate = date.toISOString().slice(0, 10);
  }
  const displayTime = time;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2 style="color: #dc2626;">Appointment Cancellation Notice</h2>
      <p>Dear ${name || 'Client'},</p>
      <p>We regret to inform you that your appointment has been <b>cancelled</b>.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">Date:</td>
          <td style="padding: 8px;">${displayDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Time:</td>
          <td style="padding: 8px;">${displayTime}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Reason:</td>
          <td style="padding: 8px;">${reason}</td>
        </tr>
      </table>
      ${additionalNotes ? `
      <div style="margin-top: 16px;">
        <p style="font-weight: bold;">Additional Information:</p>
        <p style="background-color: #f3f4f6; padding: 12px; border-radius: 4px;">${additionalNotes}</p>
      </div>
      ` : ''}
      <p style="margin-top: 24px;">We apologize for any inconvenience this may cause. Please feel free to contact our office to reschedule your appointment or if you have any questions.</p>
      <p style="color: #888;">Thank you for your understanding.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Healthwise Website" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Appointment Cancellation Notice",
    html,
  });
}

export async function sendAppointmentRejectionMail({ name, email, date, time, reason, additionalNotes }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Format date as YYYY-MM-DD (no time zone)
  let displayDate = date;
  if (typeof date === 'string' && date.length >= 10) {
    displayDate = date.slice(0, 10);
  } else if (date instanceof Date) {
    displayDate = date.toISOString().slice(0, 10);
  }
  const displayTime = time;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2 style="color: #ea580c;">Appointment Request Declined</h2>
      <p>Dear ${name || 'Client'},</p>
      <p>We regret to inform you that your appointment request has been <b>declined</b>.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">Requested Date:</td>
          <td style="padding: 8px;">${displayDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Requested Time:</td>
          <td style="padding: 8px;">${displayTime}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Reason:</td>
          <td style="padding: 8px;">${reason}</td>
        </tr>
      </table>
      ${additionalNotes ? `
      <div style="margin-top: 16px;">
        <p style="font-weight: bold;">Additional Information:</p>
        <p style="background-color: #f3f4f6; padding: 12px; border-radius: 4px;">${additionalNotes}</p>
      </div>
      ` : ''}
      <p style="margin-top: 24px;">We apologize, but we are unable to accommodate this appointment request. If you have any questions or would like to discuss alternative options, please don't hesitate to contact our office.</p>
      <p style="color: #888;">Thank you for your understanding.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Healthwise Website" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Appointment Request Declined",
    html,
  });
} 