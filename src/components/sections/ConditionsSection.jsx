import { motion } from 'framer-motion';

const conditions = [
  { name: 'Obsessive-Compulsive Disorder (OCD)', description: 'A condition characterized by intrusive thoughts and repetitive behaviors.' },
  { name: 'Post-Traumatic Stress Disorder (PTSD)', description: 'A disorder that can develop after experiencing or witnessing a traumatic event.' },
  { name: 'Attention-Deficit/Hyperactivity Disorder (ADHD)', description: 'A neurodevelopmental disorder marked by inattention, hyperactivity, and impulsivity.' },
  { name: 'Bipolar Disorder', description: 'A mood disorder with episodes of depression and periods of elevated mood or mania.' },
  { name: 'Generalized Anxiety Disorder (GAD)', description: 'A condition involving excessive, persistent worry about various aspects of life.' },
  { name: 'Major Depressive Disorder (MDD)', description: 'A mood disorder causing persistent feelings of sadness and loss of interest.' },
];

export default function ConditionsSection() {
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
        <h1 className="text-4xl font-bold mb-4 text-primary">Conditions We Treat</h1>
        <p className="text-gray-700 text-lg mb-4">
          We provide compassionate, evidence-based care for a range of mental health conditions. Below are some of the primary conditions we help individuals manage and overcome.
        </p>
      </motion.div>
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {conditions.map((cond) => (
          <motion.div
            key={cond.name}
            className="bg-gray-50 rounded-2xl shadow p-6 flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-primary mb-2">{cond.name}</h2>
            <p className="text-gray-700 text-base">{cond.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
} 