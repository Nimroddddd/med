import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Banner from '../../ui/Banner';
import PageTransition from '../../PageTransition';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { fetchTestimonials, submitTestimonial } from '../../../api/testimonials';

const placeholderTestimonials = [
  {
    name: 'Jane D.',  
    feedback: 'The team at Healthwise Psychiatry & Wellness truly cares. I felt heard and supported every step of the way.',
  },
  {
    name: 'Michael S.',
    feedback: 'Booking was easy and the provider was very knowledgeable. Highly recommend!',
  },
  {
    name: 'Ava R.',
    feedback: 'I appreciate the compassion and professionalism. My mental health has improved so much.',
  },
  { 
    name: 'Chris P.',
    feedback: 'The virtual appointments made it so convenient for my busy schedule.',
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(placeholderTestimonials);
  const [form, setForm] = useState({ name: '', feedback: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch(() => {/* fallback to placeholderTestimonials */})
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newTestimonial = await submitTestimonial({ name: form.name || 'Anonymous', feedback: form.feedback });
      setTestimonials([newTestimonial, ...testimonials]);
      setForm({ name: '', feedback: '' });
      setShowModal(false);
      setSuccess('Thank you for your feedback!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setSuccess('There was a problem submitting your review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <section>
        <Banner image="office-4.jpg" title="Testimonials" subtitle="Hear from our patients and their experiences." />
        <motion.section
          className="py-20 bg-white min-h-[60vh] flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-2xl w-full mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-4 text-primary">What Our Patients Say</h1>
            <p className="text-gray-700 text-lg mb-8">Real stories and feedback from people we've helped on their mental health journey.</p>
            {loading ? (
              <div className="text-gray-400 py-12">Loading testimonials...</div>
            ) : testimonials.length === 0 ? (
              <div className="text-gray-400 py-12">There are no testimonials yet. Be the first to leave a review!</div>
            ) : (
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={32}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="mb-10"
              >
                {testimonials.map((t, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="bg-gray-50 rounded-2xl shadow p-12 flex flex-col items-center gap-6 min-h-[260px]">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl mb-2">
                        {t.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                      </div>
                      <p className="text-xl text-gray-800 italic mb-4">“{t.feedback}”</p>
                      <span className="text-primary font-semibold text-lg">{t.name}</span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <div className="mt-8">
              <p className="text-gray-700 text-base mb-4">We truly value your input and would love to know how your experience with us has been. Your honest feedback, good or bad, plays an important role in helping us improve and better serve our patients. If you have a moment, please share your experience with us.</p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors shadow"
              >
                Leave a Review
              </button>
              {success && <div className="text-green-600 mt-4">{success}</div>}
            </div>
          </div>

          {/* Modal for review form */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full relative animate-fadeIn">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-primary text-2xl font-bold"
                  aria-label="Close"
                >
                  ×
                </button>
                <h2 className="text-2xl font-bold text-primary mb-4">Leave a Review</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Your Name (optional)</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Your Feedback</label>
                    <textarea
                      name="feedback"
                      value={form.feedback}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Share your experience..."
                      rows={4}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
                    disabled={submitting || !form.feedback.trim()}
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </motion.section>
      </section>
    </PageTransition>
  );
} 