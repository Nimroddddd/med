import { motion } from 'framer-motion';
import { Award, Target, CheckCircle } from 'lucide-react';
import PageTransition from '../PageTransition';
import Banner from '../ui/Banner';

const AboutSection = () => {
  const goals = [
    {
      icon: CheckCircle,
      title: "Improve Access to Care",
      description: "Expand our telepsychiatry services to reach underserved communities and reduce wait times for appointments.",
    },
    {
      icon: Award,
      title: "Enhance Patient Outcomes",
      description: "Continuously monitor and improve our therapeutic techniques to achieve measurable, positive results for our patients.",
    },
    {
      icon: Target,
      title: "Promote Mental Health Awareness",
      description: "Engage in community outreach and education to destigmatize mental illness and promote the importance of mental wellness.",
    },
  ];

  return (
    <PageTransition>
      <Banner image="office-2.jpg" title="About Us" subtitle="Learn more about our mission, values, and team." />

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Mission Statement</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xl md:text-2xl text-center max-w-4xl mx-auto leading-relaxed text-gray-700">
              At Healthwise Psychiatry & Wellness, we champion an individualized path to mental health by creating a nurturing, judgment-free space where every individual and their loved ones can discover healing, build resilience, and claim their inner strength.</p>
          </motion.div>
        </div>
      </section>

      {/* Our Tagline Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl drop-shadow-lg">
              “Your Journey, Our Guidance”
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Goals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are committed to continuous improvement and making a positive impact in our community.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {goals.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutSection; 