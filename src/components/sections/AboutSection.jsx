import { motion } from 'framer-motion';
import { Award, GraduationCap, Heart, Users, Clock, Star } from 'lucide-react';
import PageTransition from '../PageTransition';

const AboutSection = () => {
  const credentials = [
    { icon: GraduationCap, title: "Doctor of Nursing Practice", detail: "DNP, PMHNP-BC" },
    { icon: Award, title: "Board Certified", detail: "Psychiatric-Mental Health Nurse Practitioner" },
    { icon: Clock, title: "Experience", detail: "Extensive experience in psychiatric and wellness care" },
    { icon: Users, title: "Patients Served", detail: "Hundreds of individuals and families" },
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Adeyemi Kobari, DNP, PMHNP-BC</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Healthwise Psychiatry and Wellness LLC<br/>
              Dedicated to providing exceptional psychiatric and wellness care with a personal touch
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Doctor Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Meet Your Provider</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Adeyemi Kobari, DNP, PMHNP-BC, is a board-certified psychiatric-mental health nurse practitioner with extensive experience providing compassionate psychiatric and wellness care to individuals and families. 
                  He is dedicated to building lasting relationships and supporting the mental health and well-being of the community.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  As the founder of Healthwise Psychiatry and Wellness LLC, Adeyemi Kobari is committed to delivering personalized, evidence-based care in a supportive environment.
                </p>
              </div>

              {/* Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {credentials.map((credential, index) => (
                  <motion.div
                    key={credential.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Doctor Image Placeholder */}
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-48 h-48 rounded-full overflow-hidden flex items-center justify-center mx-auto bg-primary">
                      <img
                        src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=400&facepad=2"
                        alt="Adeyemi Kobari profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900">Adeyemi Kobari, DNP, PMHNP-BC</h3>
                      <p className="text-gray-600">Psychiatric Nurse Practitioner</p>
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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