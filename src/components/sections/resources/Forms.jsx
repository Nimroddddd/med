import { motion } from 'framer-motion';
import { Download, Mail } from 'lucide-react';

const generalForms = [
  { name: 'New Patient Forms', link: '#' },
  { name: 'Existing Patient - Annual Renewal', link: '#' },
  { name: 'Notice of Privacy Policies', link: '#' },
  { name: 'Authorization to Release Medical Information', link: '#' },
  { name: 'Credit Card on File Authorization', link: '#' },
  { name: 'Payment Plan Agreement', link: '#' },
  { name: 'Self Pay Agreement', link: '#' },
  { name: 'Buprenorphine Consent', link: '#' },
  { name: 'Patient Satisfaction Survey', link: '#' },
];

const spravatoForms = [
  { name: 'Spravato Patient Informed Consent Form', link: '#' },
  { name: 'Spravato Assistance Enrollment Form', link: '#' },
  { name: 'Spravato Enrollment Form', link: '#' },
  { name: 'Spravato Patient Enrollment Form', link: '#' },
];

export default function Forms() {
  return (
    <motion.section
      className="py-20 bg-white min-h-[60vh]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="max-w-2xl mx-auto text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-primary">Patient Forms</h1>
        <p className="text-gray-700 text-lg mb-4">
          <strong>Your First Visit</strong><br />
          As a friendly reminder, new patient forms must be completed and returned at least 24 hours prior to your appointment.
        </p>
        <p className="text-gray-700 text-base mb-2">Thank you,<br />Conventions Health</p>
        <div className="flex items-center justify-center gap-2 text-primary text-sm mb-4">
          <Mail className="w-5 h-5" />
          <span>Email completed forms to <a href="mailto:contact@conventionspc.com" className="underline">contact@conventionspc.com</a></span>
        </div>
        <div className="bg-primary/5 rounded-lg p-4 text-left text-gray-700 text-base mb-4">
          <strong>How to save and send your completed form:</strong>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Click on the desired form link below.</li>
            <li>Fill out the information in the form.</li>
            <li>Select the printer icon in the upper right-hand corner.</li>
            <li>Select 'Save as PDF' from the printer selection drop-down.</li>
            <li>Once your file is saved, email it to <a href="mailto:contact@conventionspc.com" className="underline">contact@conventionspc.com</a>.</li>
          </ol>
        </div>
      </motion.div>
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-gray-50 rounded-2xl shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-primary mb-4">Downloadable Patient Forms</h2>
          <ul className="space-y-3">
            {generalForms.map(form => (
              <li key={form.name} className="flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                <a href={form.link} className="text-gray-900 hover:text-primary underline" download>{form.name}</a>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          className="bg-gray-50 rounded-2xl shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-primary mb-4">Spravato Patient Forms</h2>
          <ul className="space-y-3">
            {spravatoForms.map(form => (
              <li key={form.name} className="flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                <a href={form.link} className="text-gray-900 hover:text-primary underline" download>{form.name}</a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
} 