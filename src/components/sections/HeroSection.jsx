import { motion } from 'framer-motion';
import { Calendar, Phone, ArrowRight, Shield, Heart, Users } from 'lucide-react';
import PageTransition from '../PageTransition';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <PageTransition>
      <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-white to-medical-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Healthwise Psychiatry and Wellness LLC
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                >
                  Your Health,{' '}
                  <span className="text-primary">Our Priority</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl text-gray-600 leading-relaxed"
                >
                  Welcome to compassionate, comprehensive psychiatric and wellness care. Adeyemi Kobari, DNP, PMHNP-BC provides personalized mental health care for you and your loved ones in a supportive environment.
                </motion.p>
              </div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-gray-700 font-medium">Compassionate Care</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-gray-700 font-medium">Family Focused</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-gray-700 font-medium">Trusted Care</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/book"
                  className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-secondary transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-primary hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Content - Doctor Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Placeholder for doctor image */}
                <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-64 h-64 rounded-full overflow-hidden flex items-center justify-center mx-auto bg-primary">
                      <img
                        src="profile.jpg"
                        alt="Adeyemi Kobari profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900">Adeyemi Kobari, DNP, PMHNP-BC</h3>
                      <p className="text-gray-600">Psychiatric Nurse Practitioner</p>
                      <p className="text-sm text-gray-500">Healthwise Psychiatry and Wellness LLC</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">5000+</div>
                    <div className="text-sm text-gray-600">Happy Patients</div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">15+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default HeroSection; 