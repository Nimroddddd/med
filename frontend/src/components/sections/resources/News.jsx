import { useState } from 'react';
import { motion } from 'framer-motion';
import Banner from '../../ui/Banner';
import { submitNewsletterSignup } from '../../../api/newsletter';

export default function News() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);
    try {
      await submitNewsletterSignup(email);
      setSuccess('Thank you for signing up! You will receive our next newsletter.');
      setEmail('');
    } catch (err) {
      setError('There was a problem signing up. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <Banner image="office-3.jpg" title="News" subtitle="Stay updated with the latest news and announcements." />
      <motion.section
        className="pt-0 sm:pt-10 pb-20 bg-white min-h-[60vh] flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold mb-4 text-primary">News & Updates</h1>
          <p className="text-gray-700 text-lg mb-8">This page will feature news and updates from our practice.</p>
          <div className="bg-gray-50 rounded-2xl shadow p-8 mt-8 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-primary mb-2">Sign Up for Our Newsletter</h2>
            <p className="text-gray-700 mb-4 text-base">Get the latest news, updates, and mental health tips delivered to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-3 items-center justify-center" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full sm:w-auto flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your email address"
                required
              />
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors"
                disabled={submitting}
              >
                {submitting ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
            {success && <div className="text-green-600 mt-3">{success}</div>}
            {error && <div className="text-red-600 mt-3">{error}</div>}
          </div>
        </motion.div>
      </motion.section>
    </section>
  );
} 