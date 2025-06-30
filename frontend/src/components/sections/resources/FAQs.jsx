import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from './faqData';
import Banner from '../../ui/Banner';
import PageTransition from '../../PageTransition';

export default function FAQs() {
  const [open, setOpen] = useState(null);
  return (
    <PageTransition>
      <Banner
        image="office-2.jpg"
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our services."
      />
      <motion.section
        className="py-20 bg-white min-h-[60vh]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        
        <motion.div
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-gray-700 text-lg">Click a question below to expand and see the answer.</p>
        </motion.div>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={faq.question}
              className="bg-gray-50 rounded-xl shadow p-4 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
            >
              <button
                className="flex items-center justify-between w-full text-lg font-semibold text-gray-900 focus:outline-none"
                onClick={() => setOpen(open === idx ? null : idx)}
                aria-expanded={open === idx}
              >
                {faq.question}
                <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${open === idx ? 'rotate-180' : ''}`} />
              </button>
              {open === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-2 text-gray-700"
                >
                  {faq.answer ? (
                    <div className="whitespace-pre-line leading-relaxed">
                      {faq.answer}
                    </div>
                  ) : (
                    <div className="italic text-gray-400">(Answer coming soon)</div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </PageTransition>
  );
} 