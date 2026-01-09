import { sendContactMail } from "../utils/sendMail.js";

export const handleContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    await sendContactMail({ name, email, phone, message });
    return res.status(200).json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
}; 