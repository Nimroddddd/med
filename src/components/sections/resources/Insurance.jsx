import { motion } from 'framer-motion';
import { ShieldCheck, Info, Phone } from 'lucide-react';

const insurancePlans = [
  { name: 'Aetna', logo: '/src/assets/insurance-logos/aetna.svg' },
  { name: 'Blue Cross Blue Shield', logo: '/src/assets/insurance-logos/bcbs.svg' },
  { name: 'Cigna', logo: '/src/assets/insurance-logos/cigna.svg' },
  { name: 'UnitedHealthcare', logo: '/src/assets/insurance-logos/unitedhealthcare.svg' },
  { name: 'Medicaid', logo: '/src/assets/insurance-logos/medicaid.svg' },
  { name: 'Humana', logo: '/src/assets/insurance-logos/humana.svg' },
  { name: 'Beacon Health Options', logo: '/src/assets/insurance-logos/beacon.svg' },
];

export default function Insurance() {
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
        <h1 className="text-4xl font-bold mb-4 text-primary">Insurance Information</h1>
        <p className="text-gray-700 text-lg mb-4">
          We accept a variety of insurance plans to make mental health care accessible and affordable. If you have questions about your coverage, please contact our office for assistance.
        </p>
      </motion.div>
      <div className="max-w-6xl mx-auto bg-gray-50 rounded-2xl shadow p-14 mb-16">
        <div className="flex items-center gap-4 mb-10">
          <ShieldCheck className="w-9 h-9 text-primary" />
          <h2 className="text-3xl font-bold text-primary">Accepted Insurance Plans</h2>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 text-gray-800 text-xl mb-8">
          {insurancePlans.map(plan => (
            <li key={plan.name} className="flex flex-col items-center gap-5 p-8 bg-white rounded-2xl shadow border h-full">
              <img src={plan.logo} alt={`${plan.name} logo`} className="w-28 h-28 object-contain bg-white rounded shadow border" />
              <span className="mt-3 font-bold text-2xl text-center">{plan.name}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 mt-8 text-blue-700 text-lg">
          <Info className="w-6 h-6" />
          <span>Please bring your insurance card to your first appointment.</span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl shadow p-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-bold text-primary">Self-Pay Options</h2>
        </div>
        <p className="text-gray-700 text-base mb-2">
          If you do not have insurance or prefer to pay out-of-pocket, we offer self-pay rates. Please contact our office for current rates and payment options.
        </p>
      </div>
      <div className="max-w-2xl mx-auto text-center mt-8">
        <div className="flex items-center justify-center gap-2 text-primary text-lg mb-2">
          <Phone className="w-5 h-5" />
          <span>Questions? Call us at <a href="tel:+17089535459" className="underline">(708) 953-5459</a></span>
        </div>
        <p className="text-gray-600 text-base">We're happy to help you understand your insurance coverage and payment options.</p>
      </div>
    </motion.section>
  );
} 