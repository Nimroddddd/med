import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import PageTransition from '../PageTransition';

const NotFound = () => {
  return (
    <PageTransition>
      <section className="flex flex-col items-center justify-center min-h-[60vh] py-20 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex flex-col items-center mb-8">
            <AlertTriangle className="w-16 h-16 text-primary mb-4" />
            <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">
              Sorry, the page you are looking for does not exist or has been moved.
            </p>
          </div>
          <Link
            to="/"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-secondary transition-colors"
          >
            Go to Homepage
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default NotFound; 