import { useParams, Link } from 'react-router-dom';

const PROVIDERS = [
  {
    id: 'adeyemi-kobari',
    name: 'Adeyemi Kobari',
    credential: 'DNP, PMHNP-BC',
    image: '/profile.jpg',
    bio: 'Adeyemi Kobari is a dedicated healthcare provider specializing in mental health. He is committed to helping his patients overcome mental health issues and achieve a higher quality of life by building a therapeutic patient-provider relationship that encompasses holistic and patient-centered care.',
    specialties: [
      'Schizophrenia',
      'Schizoaffective Disorder',
      'Bipolar Disorder',
      'Trauma and PTSD',
      'Borderline Personality Disorder',
      'OCD',
      'Depression',
      'Anxiety',
    ],
    education: [
      'Bachelor of Science in Nursing (BSN)',
      'Master of Science in Nursing (MSN)',
      'Psychiatric-Mental Health Nurse Practitioner (PMHNP-BC) certified by ANCC'
    ],
    interests: 'He values spending time with his family and engaging in activities such as swimming, skating, and playing sports. Adeyemi is also an avid reader, continuously expanding his knowledge and perspectives.',
    quote: 'Comfort zone is a killer of success.'
  },
  {
    id: 'provider-2',
    name: 'Future Provider',
    credential: 'Coming Soon',
    bio: 'Information about this provider will be available soon.'
  },
  {
    id: 'provider-3',
    name: 'Future Provider',
    credential: 'Coming Soon',
    bio: 'Information about this provider will be available soon.'
  },
  {
    id: 'provider-4',
    name: 'Future Provider',
    credential: 'Coming Soon',
    bio: 'Information about this provider will be available soon.'
  },
  {
    id: 'provider-5',
    name: 'Future Provider',
    credential: 'Coming Soon',
    bio: 'Information about this provider will be available soon.'
  },
];

export default function ProviderDetail() {
  const { id } = useParams();
  const provider = PROVIDERS.find(p => p.id === id);

  if (!provider) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Provider Not Found</h2>
        <Link to="/providers" className="text-primary underline">Back to Providers</Link>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/providers" className="text-primary underline font-semibold">&larr; Back to All Providers</Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{provider.name}</h1>
            <p className="text-xl font-semibold text-primary mb-6">{provider.credential}</p>
            <hr className="mb-6" />
            <div className="space-y-8 text-lg text-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">About</h2>
                <p>{provider.bio}</p>
              </div>
              {provider.specialties && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Specialties</h2>
                  <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {provider.specialties.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              )}
              {provider.education && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Education & Credentials</h2>
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
                  src={provider.image}
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
  );
}
