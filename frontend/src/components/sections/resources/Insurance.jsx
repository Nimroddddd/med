import { motion } from 'framer-motion';
import { ShieldCheck, Info, Phone } from 'lucide-react';
import Banner from '../../ui/Banner';
import PageTransition from '../../PageTransition';

const insurancePlans = [
  { name: 'Aetna', logo: 'insurance-logos/aetna.svg' },
  { name: 'Blue Cross Blue Shield of Massachusetts', logo: 'insurance-logos/bcbs.svg' },
  { name: 'Cigna', logo: 'insurance-logos/cigna.svg' },
  { name: 'UnitedHealthcare', logo: 'insurance-logos/unitedhealthcare.svg' },
  {name: "Oxford Health Plans", logo: 'insurance-logos/oxford.svg'},
  {name: "Oscar Health Inurance", logo: 'insurance-logos/oscar.svg'}
];

export default function Insurance() {
  return (
    <PageTransition>
      <section>
        <Banner
          image="office-2.jpg"
          title="Insurance"
          subtitle="We accept a variety of insurance plans."
        />
        <motion.section
          className="py-20 bg-white min-h-[60vh]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-6xl mx-auto bg-gray-50 rounded-2xl shadow p-14 mb-16">
            <div className="flex items-center gap-4 mb-10">
              <ShieldCheck className="w-9 h-9 text-primary" />
              <h2 className="text-3xl font-bold text-primary">Accepted Insurance Plans</h2>
            </div>
            <div className="text-center text-gray-700 text-lg  mb-8">
              We partner with leading insurance providers to help make your care more accessible. If you don't see your plan listed, please contact us—our team is happy to help verify your coverage.
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-gray-800 text-xl mb-8">
              {insurancePlans.map(plan => (
                <li key={plan.name} className="flex flex-col items-center gap-6 p-10 bg-white rounded-2xl shadow border h-full min-w-[220px]">
                  <img src={plan.logo} alt={`${plan.name} logo`} className="px-3 w-40 h-32 object-contain bg-white rounded shadow border" />
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
      </section>
    </PageTransition>
  );
} 