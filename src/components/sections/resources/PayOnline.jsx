import { motion } from 'framer-motion';

export default function PayOnline() {
  return (
    <motion.section
      className="py-20 bg-white min-h-[60vh] flex items-center justify-center"
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
        <h1 className="text-3xl font-bold mb-4 text-primary">Pay Online</h1>
        <p className="text-gray-700 text-lg">This page will provide information and links for online payments.</p>
      </motion.div>
    </motion.section>
  );
} 