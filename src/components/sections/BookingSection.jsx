import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../PageTransition';

// Helper to get next N days that are Thu/Fri/Sat
function getSelectableDates(numWeeks = 4) {
  const days = [];
  const today = new Date();
  let d = new Date(today);
  d.setHours(0, 0, 0, 0);
  let count = 0;
  while (count < numWeeks * 3) { // 3 days per week
    if ([4, 5, 6].includes(d.getDay())) { // Thu=4, Fri=5, Sat=6
      days.push(new Date(d));
      count++;
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}

const TIME_SLOTS = Array.from({ length: 10 }, (_, i) => {
  const hour = 7 + i;
  const ampm = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return {
    value: `${hour.toString().padStart(2, '0')}:00`,
    label: `${displayHour}:00 ${ampm}`
  };
});

const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const selectableDates = getSelectableDates();

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime(''); // reset time when date changes
  };

  const handleTimeSelect = (slot) => {
    setSelectedTime(slot);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just alert
    alert(`Appointment requested for ${selectedDate} at ${selectedTime}`);
  };

  return (
    <PageTransition>
      <section className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10 flex flex-col justify-center py-12 mt-10">
        <div className="max-w-5xl w-full mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center"
          >
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">Book an Appointment</h1>
            </div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Schedule your visit with us. Fill out the form below and our team will contact you to confirm your appointment.
            </p>
          </motion.div>

          <div className="bg-white/90 rounded-2xl shadow-xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Left: Form */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Appointment Request</h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                  <input name="name" value={form.name} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your Name" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Email</label>
                  <input name="email" value={form.email} onChange={handleInputChange} type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@email.com" required />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 font-medium mb-1">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleInputChange} type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="(555) 123-4567" required />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 font-medium mb-1">Select Date</label>
                    <select value={selectedDate} onChange={handleDateChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" required>
                      <option value="" disabled>Select a date</option>
                      {selectableDates.map(date => (
                        <option key={date.toISOString()} value={date.toISOString().slice(0,10)}>
                          {date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Select Time</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                    {TIME_SLOTS.map(slot => (
                      <button
                        type="button"
                        key={slot.value}
                        onClick={() => handleTimeSelect(slot.value)}
                        className={`px-4 py-2 rounded-lg border font-medium transition-colors
                          ${selectedTime === slot.value ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300 hover:bg-primary/10'}
                        `}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Message</label>
                  <textarea name="message" value={form.message} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" rows="3" placeholder="Additional details (optional)" />
                </div>
                <button type="submit" disabled={!selectedDate || !selectedTime} className={`w-full bg-primary text-white py-3 rounded-lg font-semibold text-lg transition-colors shadow-md ${(!selectedDate || !selectedTime) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary'}`}>Submit Request</button>
              </form>
            </div>
            {/* Right: Info */}
            <div className="bg-primary/5 rounded-xl p-6 md:p-8 flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">What to Expect</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Our team will review your request and reach out to confirm your appointment.</li>
                  <li>Bring your insurance card and a list of current medications if applicable.</li>
                  <li>Arrive 10 minutes early for your first visit.</li>
                  <li>All information is kept confidential.</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-primary mb-1">Need Help?</h4>
                <p className="text-gray-700">Call us at <a href="tel:5551234567" className="text-primary underline">(555) 123-4567</a> or email <a href="mailto:info@healthwise.com" className="text-primary underline">info@healthwise.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default BookingSection; 