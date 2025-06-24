import AuthGate from './AuthGate';
import AvailabilitySection from './AvailabilitySection';
import AppointmentsSection from './AppointmentsSection';
import ClientsSection from './ClientsSection';
import { useState } from 'react';

const sections = {
  availability: <AvailabilitySection />,
  appointments: <AppointmentsSection />,
  clients: <ClientsSection />,
};

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('owner_authed');
    window.location.reload();
  };
  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1.5 rounded font-semibold hover:bg-red-200 transition-colors text-sm"
      title="Logout"
    >
      {/* Simple logout icon (door with arrow) */}
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 15l3-3m0 0l-3-3m3 3H9" />
      </svg>
      Logout
    </button>
  );
}

export default function OwnerPortalApp() {
  const [active, setActive] = useState('availability');

  return (
    <AuthGate>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-primary text-white py-4 px-8 flex items-center justify-between shadow">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Healthwise Psychiatry and Wellness LLC</span>
          </div>
          <LogoutButton />
        </header>
        <div className="flex flex-1">
          <nav className="w-64 bg-white border-r p-6 space-y-4">
            {Object.keys(sections).map(key => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`block w-full text-left px-4 py-2 rounded font-semibold transition-colors ${active === key ? 'bg-primary text-white' : 'text-primary hover:bg-primary/10'}`}
              >
                {key === 'availability' && 'Set Availability'}
                {key === 'appointments' && 'Manage Appointments'}
                {key === 'clients' && 'Client Info'}
              </button>
            ))}
          </nav>
          <main className="flex-1 p-8">
            {sections[active]}
          </main>
        </div>
      </div>
    </AuthGate>
  );
} 