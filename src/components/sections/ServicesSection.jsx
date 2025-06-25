import { motion } from 'framer-motion';
import { 
  User, 
  Users, 
  Home, 
  Users2, 
  ClipboardCheck, 
  Pill, 
  Smile, 
  Video,
  Shield,
  Clock,
  CheckCircle
} from 'lucide-react';
import PageTransition from '../PageTransition';
import { Link } from 'react-router-dom';

  const services = [
    {
    icon: User,
    title: "Individual Therapy",
    description: "One-on-one sessions focused on personal growth, coping strategies, and addressing specific mental health concerns."
  },
  {
    icon: Users,
    title: "Couples Counseling",
    description: "Helping partners improve communication, resolve conflicts, and strengthen their relationship."
    },
    {
    icon: Home,
    title: "Family Therapy",
    description: "Addressing family dynamics, improving communication, and supporting families through challenges."
    },
    {
    icon: Users2,
    title: "Group Therapy",
    description: "Connect with others facing similar challenges in a supportive group setting led by a therapist."
    },
    {
    icon: ClipboardCheck,
    title: "Psychiatric Evaluation",
    description: "Comprehensive assessment to diagnose mental health conditions and formulate treatment plans."
    },
    {
    icon: Pill,
    title: "Medication Management",
    description: "Expert oversight of psychiatric medications to ensure effectiveness and manage side effects."
  },
  {
    icon: Smile,
    title: "Child & Adolescent Therapy",
    description: "Specialized therapy approaches tailored to the unique needs of children and teenagers."
    },
    {
    icon: Video,
    title: "Teletherapy Services",
    description: "Secure virtual sessions from the comfort of your home for convenient access to mental health support."
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

const ServicesSection = () => {
  return (
    <PageTransition>
      {/* Background Image Banner */}
      <div
        className="relative py-40 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/office-2.jpg')" }} // Placeholder image
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg"
          >
            Comprehensive mental health care for individuals, couples, and families.
          </motion.p>
        </div>
      </div>

      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-gray-50 rounded-2xl p-8 text-center shadow hover:shadow-lg transition-shadow flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
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