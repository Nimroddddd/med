import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  Baby, 
  Heart, 
  Syringe, 
  FileText, 
  Calendar,
  Shield,
  Clock,
  CheckCircle
} from 'lucide-react';
import PageTransition from '../PageTransition';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  const services = [
    {
      icon: Stethoscope,
      title: "Primary Care",
      description: "Comprehensive health care for all ages including physical exams, health screenings, and preventive care.",
      features: ["Annual Physicals", "Health Screenings", "Chronic Disease Management", "Preventive Care"]
    },
    {
      icon: Baby,
      title: "Pediatric Care",
      description: "Specialized care for children from newborns to adolescents, including vaccinations and growth monitoring.",
      features: ["Well-Child Visits", "Vaccinations", "Growth Monitoring", "Sick Visits"]
    },
    {
      icon: Heart,
      title: "Cardiovascular Health",
      description: "Heart health monitoring, risk assessment, and management of cardiovascular conditions.",
      features: ["Heart Health Screening", "Blood Pressure Management", "Cholesterol Monitoring", "Lifestyle Counseling"]
    },
    {
      icon: Syringe,
      title: "Immunizations",
      description: "Comprehensive vaccination services for children and adults to protect against preventable diseases.",
      features: ["Childhood Vaccines", "Adult Vaccines", "Travel Vaccines", "Flu Shots"]
    },
    {
      icon: FileText,
      title: "Health Management",
      description: "Ongoing care for chronic conditions like diabetes, hypertension, and asthma.",
      features: ["Diabetes Care", "Hypertension Management", "Asthma Treatment", "Medication Management"]
    },
    {
      icon: Calendar,
      title: "Same-Day Appointments",
      description: "Urgent care services for acute illnesses and injuries when you need immediate attention.",
      features: ["Urgent Care", "Sick Visits", "Minor Injuries", "Telemedicine"]
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Trusted Care",
      description: "Board-certified physician with 15+ years of experience"
    },
    {
      icon: Clock,
      title: "Convenient Hours",
      description: "Extended hours including Saturday appointments"
    },
    {
      icon: CheckCircle,
      title: "Comprehensive Care",
      description: "One-stop care for your entire family"
    }
  ];

  return (
    <PageTransition>
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare services for your entire family, from newborns to seniors
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Practice?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-16"
          >
            <div className="bg-primary rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Schedule Your Visit?</h3>
              <p className="text-lg mb-6 text-blue-100">
                Book your appointment today and experience compassionate, comprehensive healthcare
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                <Link to="/book">
                  Schedule Appointment
                </Link>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ServicesSection; 