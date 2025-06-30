import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../PageTransition';
import { bookAppointment } from '../../api/appointments';
import { getAvailableSlots, convertDayAvailabilityToDates } from '../../api/availability';
import Banner from '../ui/Banner';
import { Calendar } from 'lucide-react';

// Helper to get next N weeks of Thu/Fri/Sat dates
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

const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [availableSlots, setAvailableSlots] = useState({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);

  // Fetch available slots when component mounts
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      setLoadingSlots(true);
      try {
        const startDate = new Date().toISOString().split('T')[0];
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + (4 * 7)); // 4 weeks from now
        const endDateStr = endDate.toISOString().split('T')[0];
        
        console.log('Frontend requesting dates:', { startDate, endDateStr });
        
        const data = await getAvailableSlots(startDate, endDateStr);
        console.log('Backend returned data:', data);
        console.log('Backend available dates:', Object.keys(data));
        
        setAvailableSlots(data);
        
        // Convert backend dates to Date objects for the dropdown
        const dates = Object.keys(data).map(dateStr => new Date(dateStr));
        dates.sort((a, b) => a - b); // Sort chronologically
        setAvailableDates(dates);
        
      } catch (err) {
        console.error('Failed to load available slots from API:', err);
        
        // Fallback: Use default availability pattern
        // This assumes the provider has set availability for Thu/Fri/Sat
        const defaultAvailability = {
          thursday: ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
          friday: ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
          saturday: ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
        };
        
        const startDate = new Date().toISOString().split('T')[0];
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + (4 * 7));
        const endDateStr = endDate.toISOString().split('T')[0];
        
        const fallbackSlots = convertDayAvailabilityToDates(defaultAvailability, startDate, endDateStr);
        setAvailableSlots(fallbackSlots);
        
        // Use fallback dates
        const fallbackDates = Object.keys(fallbackSlots).map(dateStr => new Date(dateStr));
        fallbackDates.sort((a, b) => a - b);
        setAvailableDates(fallbackDates);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchAvailableSlots();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await bookAppointment({
        name: form.name,
        email: form.email,
        phone: form.phone,
        date: selectedDate,
        time: selectedTime,
        message: form.message,
      });
      setSuccess('Appointment requested successfully! We will contact you soon.');
      setForm({ name: '', email: '', phone: '', message: '' });
      setSelectedDate('');
      setSelectedTime('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to request appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get available time slots for selected date
  const getAvailableTimesForDate = (date) => {
    if (!availableSlots[date]) return [];
    return availableSlots[date];
  };

  // Check if a time slot is available
  const isTimeSlotAvailable = (date, time) => {
    const availableTimes = getAvailableTimesForDate(date);
    return availableTimes.includes(time);
  };

  // Generate time slots (7 AM to 4 PM)
  const generateTimeSlots = () => {
    return Array.from({ length: 10 }, (_, i) => {
      const hour = 7 + i;
      const ampm = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      return {
        value: `${hour.toString().padStart(2, '0')}:00`,
        label: `${displayHour}:00 ${ampm}`
      };
    });
  };

  const TIME_SLOTS = generateTimeSlots();

  return (
    <PageTransition>
      <Banner
        image="office-3.jpg"
        title="Book an Appointment"
        subtitle="Schedule your visit with us. Fill out the form below and our team will contact you to confirm your appointment."
        titleColor="text-white"
        subtitleColor="text-gray-200"
        // icon={<div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-2"><Calendar className="w-8 h-8 text-white" /></div>}
      />
      <section className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10 flex flex-col justify-center py-12 mt-10">
        <div className="max-w-5xl w-full mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center"
          >
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
                      {availableDates.map(date => {
                        const dateStr = date.toISOString().slice(0, 10);
                        const availableTimes = getAvailableTimesForDate(dateStr);
                        const hasAvailability = availableTimes.length > 0;
                        return (
                          <option 
                            key={dateStr} 
                            value={dateStr}
                            disabled={!hasAvailability}
                          >
                            {date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                            {hasAvailability && ` (${availableTimes.length} slots)`}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Select Time
                    {loadingSlots && <span className="text-sm text-gray-500 ml-2">(Loading availability...)</span>}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                    {TIME_SLOTS.map(slot => {
                      const isAvailable = selectedDate ? isTimeSlotAvailable(selectedDate, slot.value) : false;
                      const isDisabled = !selectedDate || !isAvailable;
                      
                      return (
                        <button
                          type="button"
                          key={slot.value}
                          onClick={() => handleTimeSelect(slot.value)}
                          disabled={isDisabled}
                          className={`px-4 py-2 rounded-lg border font-medium transition-colors
                            ${selectedTime === slot.value 
                              ? 'bg-primary text-white border-primary' 
                              : isAvailable 
                                ? 'bg-white text-gray-700 border-gray-300 hover:bg-primary/10' 
                                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            }
                          `}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                  {selectedDate && getAvailableTimesForDate(selectedDate).length === 0 && (
                    <p className="text-sm text-gray-500 mt-2">No available time slots for this date.</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Message</label>
                  <textarea name="message" value={form.message} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" rows="3" placeholder="Additional details (optional)" />
                </div>
                {success && <div className="text-green-600 text-sm font-semibold">{success}</div>}
                {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
                <button 
                  type="submit" 
                  disabled={!selectedDate || !selectedTime || loading} 
                  className={`w-full bg-primary text-white py-3 rounded-lg font-semibold text-lg transition-colors shadow-md ${
                    (!selectedDate || !selectedTime || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary'
                  }`}
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
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
                <p className="text-gray-700">Call us at <a href="tel:5551234567" className="text-primary underline">+1 (708) 953-5459</a> or email <a href="mailto:info@healthwisepw.com" className="text-primary underline">info@healthwisepw.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default BookingSection; 