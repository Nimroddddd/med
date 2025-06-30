import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Practice Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              {/* <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-sm">MD</span>
              </div> */}
              <h3 className="text-xl font-bold">Healthwise Psychiatry & Wellness</h3>
            </div>
            <p className="text-gray-200 mb-4">
              Providing compassionate, comprehensive psychiatric and wellness care for our community.
            </p>
            {/* <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div> */}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-300" />
                <span className="text-gray-200">+1 (708) 953-5459</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-300" />
                <span className="text-gray-200">info@healthwisepw.com</span>
              </div>
              {/* <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-300" />
                <span className="text-gray-200">1147 Brook Forest Avenue, Shorewood, IL 60404, United States</span>
              </div> */}
            </div>
          </motion.div>

          {/* Office Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Office Hours</h4>
            <div className="space-y-2 text-gray-200">
              <div className="flex justify-between">
                <span>Thursday</span>
                <span>7:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Friday</span>
                <span>7:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>7:00 AM - 5:00 PM</span>
              </div>
            </div>
            {/* <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <p className="text-sm text-gray-200">
                <strong>Emergency:</strong> Call 911 or visit nearest emergency room
              </p>
            </div> */}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-white/20 mt-8 pt-8 text-center text-gray-300"
        >
          <p>&copy; {currentYear} Healthwise Psychiatry & Wellness LLC. All rights reserved.</p>
          <div className="mt-2 space-x-4 text-sm">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/hipaa-notice" className="hover:text-white transition-colors">HIPAA Notice</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 