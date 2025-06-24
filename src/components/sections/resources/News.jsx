import { motion } from 'framer-motion';

export default function News() {
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
        <h1 className="text-3xl font-bold mb-4 text-primary">News & Updates</h1>
        <p className="text-gray-700 text-lg">This page will feature news and updates from our practice.</p>
      </motion.div>
    </motion.section>
  );
} 