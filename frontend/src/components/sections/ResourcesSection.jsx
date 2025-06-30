import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  Shield,
  Info,
  ExternalLink
} from 'lucide-react';
import PageTransition from '../PageTransition';
import { Link } from 'react-router-dom';

const ResourcesSection = () => {
  const forms = [
    {
      icon: FileText,
      title: "New Patient Registration",
      description: "Complete registration form for new patients",
      downloadUrl: "#"
    },
    {
      icon: FileText,
      title: "Medical History Form",
      description: "Detailed medical history questionnaire",
      downloadUrl: "#"
    },
    {
      icon: FileText,
      title: "Insurance Information",
      description: "Insurance verification and billing forms",
      downloadUrl: "#"
    },
    {
      icon: FileText,
      title: "HIPAA Consent Form",
      description: "Privacy practices acknowledgment",
      downloadUrl: "#"
    }
  ];

  const healthResources = [
    {
      icon: Info,
      title: "Preventive Care Guidelines",
      description: "Recommended screenings and checkups by age",
      link: "#"
    },
    {
      icon: Info,
      title: "Vaccination Schedule",
      description: "Recommended vaccines for children and adults",
      link: "#"
    },
    {
      icon: Info,
      title: "Healthy Living Tips",
      description: "Nutrition, exercise, and wellness advice",
      link: "#"
    },
    {
      icon: Info,
      title: "Common Health Conditions",
      description: "Information about frequently treated conditions",
      link: "#"
    }
  ];

  const appointmentInfo = [
    {
      icon: Calendar,
      title: "Appointment Scheduling",
      description: "Book your visit online or call us",
      action: "Schedule Now"
    },
    {
      icon: Clock,
      title: "Office Hours",
      description: "Monday-Friday: 8AM-5PM, Saturday: 9AM-2PM",
      action: "View Hours"
    },
    // {
    //   icon: Phone,
    //   title: "Emergency Contact",
    //   description: "For urgent care needs",
    //   action: "Call Now"
    // }
  ];

  return (
    <PageTransition>
      <section id="resources" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Patient Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for a smooth healthcare experience
            </p>
          </motion.div>

          {/* Forms Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Patient Forms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {forms.map((form, index) => (
                <motion.div
                  key={form.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <form.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{form.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{form.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm font-medium">Download PDF</span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Health Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Health Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {healthResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <resource.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{resource.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">Learn More</span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Appointment Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-primary/5 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Getting Started</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {appointmentInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h4>
                  <p className="text-gray-600 mb-4">{info.description}</p>
                  {info.action === 'Schedule Now' ? (
                    <Link
                      to="/book"
                      className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-secondary transition-colors inline-block"
                    >
                      {info.action}
                    </Link>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-secondary transition-colors"
                    >
                      {info.action}
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 bg-yellow-50 border border-yellow-200 rounded-xl p-6"
          >
            <div className="flex items-start space-x-4">
              <Shield className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              {/* <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
                <p className="text-yellow-700 text-sm">
                  For medical emergencies, please call 911 or go to the nearest emergency room. 
                  This website is for informational purposes only and should not replace professional medical advice.
                </p>
              </div> */}
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ResourcesSection; 