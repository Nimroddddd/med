import { motion } from 'framer-motion';
import Banner from '../../ui/Banner';
import PageTransition from '../../PageTransition';

export default function Blog() {
  return (
    <PageTransition>
      <section>
        <Banner image="office.jpg" title="Blog" subtitle="Read our latest articles and insights on mental health." />
        <motion.section
          className="pb-20 bg-white min-h-[60vh] flex items-center justify-center"
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
            <p className="text-gray-700 text-lg">This page will feature our latest blog posts and articles.</p>
          </motion.div>
        </motion.section>
      </section>
    </PageTransition>
  );
} 