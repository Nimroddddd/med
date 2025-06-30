import { motion } from 'framer-motion';
import PageTransition from '../../PageTransition';
import { Brain, Heart, Zap, Sun, Moon, AlertTriangle, Activity } from 'lucide-react';
import Banner from '../../ui/Banner';
import { Link } from 'react-router-dom';

const conditions = [
  {
    name: 'OCD',
    fullName: 'Obsessive-Compulsive Disorder',
    icon: Brain,
    description: 'A mental health condition characterized by unwanted, recurring thoughts (obsessions) and repetitive behaviors (compulsions) that interfere with daily life.',
    symptoms: ['Intrusive thoughts', 'Compulsive behaviors', 'Anxiety when rituals are interrupted', 'Time-consuming rituals'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'PTSD',
    fullName: 'Post-Traumatic Stress Disorder',
    icon: AlertTriangle,
    description: 'A mental health condition that develops after experiencing or witnessing a traumatic event, causing persistent distressing symptoms.',
    symptoms: ['Flashbacks and nightmares', 'Avoidance of triggers', 'Hypervigilance', 'Negative mood changes'],
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'ADHD',
    fullName: 'Attention-Deficit/Hyperactivity Disorder',
    icon: Zap,
    description: 'A neurodevelopmental disorder characterized by persistent patterns of inattention, hyperactivity, and impulsivity that interfere with functioning.',
    symptoms: ['Difficulty focusing', 'Impulsivity', 'Hyperactivity', 'Poor time management'],
    color: 'from-yellow-500 to-orange-500'
  },
  {
    name: 'Bipolar',
    fullName: 'Bipolar Disorder',
    icon: Sun,
    description: 'A mental health condition characterized by extreme mood swings, including emotional highs (mania) and lows (depression).',
    symptoms: ['Manic episodes', 'Depressive episodes', 'Rapid mood changes', 'Changes in energy levels'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'GAD',
    fullName: 'Generalized Anxiety Disorder',
    icon: Heart,
    description: 'A mental health condition characterized by persistent and excessive worry about various aspects of life, often without a specific cause.',
    symptoms: ['Excessive worry', 'Restlessness', 'Difficulty concentrating', 'Physical symptoms of anxiety'],
    color: 'from-green-500 to-teal-500'
  },
  {
    name: 'MDD',
    fullName: 'Major Depressive Disorder',
    icon: Moon,
    description: 'A serious mental health condition characterized by persistent feelings of sadness, hopelessness, and loss of interest in activities.',
    symptoms: ['Persistent sadness', 'Loss of interest', 'Changes in sleep/appetite', 'Feelings of worthlessness'],
    color: 'from-gray-600 to-slate-700'
  }
];

const MentalHealthConditions = () => {
  return (
    <PageTransition>
      <section>
        <Banner image="office.jpg" title="Mental Health Conditions" subtitle="Information about conditions we diagnose and treat." />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"
              >
                <Activity className="w-8 h-8 text-white" />
              </motion.div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding common mental health conditions and their symptoms can help you recognize when professional support might be beneficial.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {conditions.map((condition, index) => (
                <motion.div
                  key={condition.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`bg-gradient-to-r ${condition.color} p-6 text-white`}>
                    <div className="flex items-center space-x-3">
                      <condition.icon className="w-8 h-8" />
                      <div>
                        <h3 className="text-2xl font-bold">{condition.name}</h3>
                        <p className="text-sm opacity-90">{condition.fullName}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {condition.description}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Common Symptoms:</h4>
                      <ul className="space-y-1">
                        {condition.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center mt-16 bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Need Professional Support?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                If you or someone you know is experiencing symptoms of these conditions, professional help is available. 
                Our team of mental health professionals can provide assessment, diagnosis, and treatment.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
              >
                <Link to="/book">
                  Schedule a Consultation
                </Link>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default MentalHealthConditions; 