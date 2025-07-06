import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProviders } from '../../api/providers';
import { motion } from 'framer-motion';
import Banner from '../ui/Banner';
import PageTransition from '../PageTransition';

const fallBackProviders = [
  {
    id: 'adeyemi-kobari',
    link_id: 'adeyemi-kobari',
    name: 'Dr. Adeyemi Kobari',
    credentials: 'DNP, PMHNP-BC',
    image: 'providers/adeyemi.jpg',
  },
];


export default function ProvidersSection() {

  const [providers, setProviders] = useState([])

  const fetchProviders = async () => {
    try {
      const response = await getProviders()
      setProviders(response)
    } catch (error) {
      setProviders(fallBackProviders)
    }
  }

  useEffect(() => {
    fetchProviders()
  }, [])


  return (
    <PageTransition>
      <motion.section
        className="bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Banner image="office-3.jpg" title="Our Providers" subtitle="Meet our dedicated team of mental health professionals." />
        
        {/* Providers Grid */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {providers.map(provider => (
                <Link
                  to={`/providers/${provider.link_id || provider.id}`}
                  key={provider.id}
                  className="flex flex-col items-center rounded-2xl shadow-lg hover:shadow-lg transition-shadow p-6 group"
                >
                  {provider.image ? (
                    <img
                      src={`${provider.image}`}
                      alt={provider.name}
                      className="w-56 h-56 object-cover rounded-xl mb-4 border-white shadow group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-56 h-56 flex items-center justify-center bg-gray-200 rounded-xl mb-4 border-white shadow group-hover:scale-105 transition-transform">
                      <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{provider.name}</div>
                    <div className="text-primary font-bold mt-1 text-sm">
                      {Array.isArray(provider.credentials)
                        ? provider.credentials.join(', ')
                        : provider.credentials}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-slate-50 border-t">
          <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
              <span className="block">Ready to Take the Next Step?</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-600">
              Your path to mental wellness starts here. Our compassionate team is ready to support you on your journey.
            </p>
            <Link
              to="/book"
              className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-secondary shadow-md hover:shadow-lg transition-transform hover:scale-105 sm:w-auto"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Book an Appointment
              <ArrowRight className="w-5 h-5 ml-3" />
            </Link>
          </div>
        </div>
      </motion.section>
    </PageTransition>
    );
} 