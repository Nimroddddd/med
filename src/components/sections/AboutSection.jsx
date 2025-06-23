import { motion } from 'framer-motion';
import { Award, GraduationCap, Heart, Users, Clock, Star } from 'lucide-react';
import PageTransition from '../PageTransition';

const AboutSection = () => {
  const credentials = [
    { icon: GraduationCap, title: "Medical Degree", detail: "Harvard Medical School" },
    { icon: Award, title: "Board Certified", detail: "American Board of Family Medicine" },
    { icon: Clock, title: "Experience", detail: "15+ Years in Practice" },
    { icon: Users, title: "Patients Served", detail: "5000+ Families" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We treat every patient with kindness, respect, and understanding."
    },
    {
      icon: Users,
      title: "Family-Centered",
      description: "Caring for your entire family from newborns to seniors."
    },
    {
      icon: Star,
      title: "Excellence",
      description: "Committed to providing the highest quality medical care."
    }
  ];

  return (
    <PageTransition>
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Dr. Sarah Johnson</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated to providing exceptional healthcare with a personal touch
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Doctor Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Meet Your Doctor</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Dr. Sarah Johnson is a board-certified family medicine physician with over 15 years 
                  of experience providing comprehensive healthcare to families in our community. 
                  She believes in building lasting relationships with her patients and their families.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  After graduating from Harvard Medical School, Dr. Johnson completed her residency 
                  at Massachusetts General Hospital. She has been serving our community since 2010, 
                  providing compassionate care to patients of all ages.
                </p>
              </div>

              {/* Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {credentials.map((credential, index) => (
                  <motion.div
                    key={credential.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <credential.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{credential.title}</h4>
                      <p className="text-sm text-gray-600">{credential.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Image and Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Doctor Image Placeholder */}
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-40 h-40 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white text-6xl font-bold">MD</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900">Dr. Sarah Johnson</h3>
                      <p className="text-gray-600">Family Medicine Physician</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Practice Philosophy */}
              <div className="bg-primary/5 p-6 rounded-xl">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Our Philosophy</h4>
                <p className="text-gray-600 leading-relaxed">
                  "I believe in treating the whole person, not just symptoms. Every patient deserves 
                  personalized care that considers their unique health journey, family history, and lifestyle."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutSection; 