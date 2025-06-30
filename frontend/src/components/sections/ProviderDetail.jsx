import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProviders, getProviderByLink } from '../../api/providers';
import { useLocation } from 'react-router-dom';
import PageTransition from '../PageTransition';

export default function ProviderDetail() {
  const { id: link_id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation()
  const providerLink = location.pathname.split('/providers/')[1];

  useEffect(() => {
    const fetchProvider = async () => {
      setLoading(true);
      setError(null);
      try {
        const foundProvider = await getProviderByLink(providerLink);
        console.log(foundProvider)
        setProvider(foundProvider || null);
        if (!foundProvider) setError('Provider not found');
      } catch (err) {
        setError('Failed to load provider details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProvider();
  }, [link_id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [link_id]);

  if (loading) {
    return <div className="py-20 text-center">Loading provider details...</div>;
  }

  if (error || !provider) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{error || 'Provider Not Found'}</h2>
        <Link to="/providers" className="text-primary underline">Back to Providers</Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/providers" className="text-primary underline font-semibold">&larr; Back to All Providers</Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-8">
            {/* Left Column: Details */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{provider.name}</h1>
              <p className="text-xl font-semibold text-primary mb-6">
                {Array.isArray(provider.credentials)
                  ? provider.credentials.join(', ')
                  : provider.credentials}
              </p>
              <hr className="mb-6" />
              <div className="space-y-8 text-lg text-gray-700">
                {provider.bio && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">About</h2>
                    <p>{provider.bio}</p>
                  </div>
                )}
                {provider.specialties && provider.specialties.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Specialties</h2>
                    <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {provider.specialties.map(s => <li key={s}>{s}</li>)}
                    </ul>
                  </div>
                )}
                {(provider.education && provider.education.length > 0) && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Education</h2>
                    <ul className="list-disc list-inside space-y-1">
                      {provider.education.map(s => <li key={s}>{s}</li>)}
                    </ul>
                  </div>
                )}
                {provider.interests && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Personal Interests</h2>
                    <p>{provider.interests}</p>
                  </div>
                )}
                {provider.quote && (
                  <div className="border-l-4 border-primary pl-4">
                    <p className="font-semibold italic text-gray-800">"{provider.quote}"</p>
                  </div>
                )}
              </div>
            </div>
            {/* Right Column: Image */}
            <div className="lg:col-span-1">
              <div className="top-24">
                {provider.image ? (
                  <img
                    src={`/providers/${provider.image}`}
                    alt={provider.name}
                    className="w-full object-cover rounded-2xl shadow-xl aspect-square"
                  />
                ) : (
                  <div className="w-full flex items-center justify-center bg-gray-200 rounded-2xl shadow-xl aspect-square">
                    <svg className="w-32 h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
