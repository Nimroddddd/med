import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is the difference between psychiatry and therapy? Do I need both?'
  },
  {
    question: 'How soon can I be seen?'
  },
  {
    question: 'Do you accept insurance?'
  },
  {
    question: 'Do you accept self-pay?'
  },
  {
    question: 'What ages do you treat?'
  },
  {
    question: 'How do I make an appointment?'
  },
  {
    question: 'Do you offer virtual/tele-health appointments?'
  },
  {
    question: 'What do I bring to my first session?'
  },
  {
    question: 'How long is my first visit?'
  },
  {
    question: 'What should I expect during my first visit?'
  },
  {
    question: 'What if I am currently experiencing an emergency?'
  }
];

export default function FAQs() {
  const [open, setOpen] = useState(null);
  return (
    <motion.section
      className="py-20 bg-white min-h-[60vh]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="max-w-2xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-primary">Frequently Asked Questions</h1>
        <p className="text-gray-700 text-lg">Click a question below to expand and see the answer.</p>
      </motion.div>
      <div className="max-w-2xl mx-auto space-y-4">
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
                <div className="italic text-gray-400">(Answer coming soon)</div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
} 