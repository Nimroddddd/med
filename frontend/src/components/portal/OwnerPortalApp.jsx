import React, { useState, lazy, Suspense } from 'react';
import AuthGate from './AuthGate';
import AvailabilitySection from './AvailabilitySection';
import AppointmentsSection from './AppointmentsSection';
import ClientsSection from './ClientsSection';

const ProviderManagement = lazy(() => import('./ProviderManagement'));
const ProviderProfile = lazy(() => import('./ProviderProfile'));
const TestimonialsManagement = lazy(() => import('./TestimonialsManagement'));

export default function OwnerPortalApp() {
  // role is passed from AuthGate as a function child
  return (
    <AuthGate>
      {(role) => <OwnerPortalContent role={role} />}
    </AuthGate>
  );
}

function OwnerPortalContent({ role }) {
  const [active, setActive] = useState('availability');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isSuperAdmin = role === 'superadmin';

  const sections = {
    availability: <AvailabilitySection />,
    appointments: <AppointmentsSection />,
    clients: <ClientsSection />,
    profile: <ProviderProfile />,
    ...(isSuperAdmin ? { providers: <ProviderManagement />, testimonials: <TestimonialsManagement /> } : {}),
  };

  const sectionLabels = {
    availability: 'Set Availability',
    appointments: 'Manage Appointments',
    clients: 'Client Info',
    profile: 'My Profile',
    providers: 'Manage Providers',
    testimonials: 'Manage Testimonials',
  };

  function LogoutButton() {
    const handleLogout = () => {
      localStorage.removeItem('portal_authed_user');
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
        <span className="hidden sm:inline">Logout</span>
      </button>
    );
  }

  const handleNavClick = (key) => {
    setActive(key);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white text-primary py-4 px-4 sm:px-8 flex items-center justify-between shadow border-b">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Healthwise Psychiatry & Wellness Logo" className="h-8 sm:h-10" />
          <div className="flex flex-col justify-center leading-tight">
            <span className="text-lg sm:text-[25px] font-extrabold text-primary">Healthwise</span>
            <span className="text-xs sm:text-sm font-medium text-secondary italic">Psychiatry & Wellness</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <LogoutButton />
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-primary hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Navigation */}
        <nav className="hidden lg:block w-64 bg-white border-r p-6 space-y-4">
          {Object.keys(sections).map(key => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`block w-full text-left px-4 py-2 rounded font-semibold transition-colors ${active === key ? 'bg-primary text-white' : 'text-primary hover:bg-primary/10'}`}
            >
              {sectionLabels[key]}
            </button>
          ))}
        </nav>

        {/* Mobile Navigation Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-primary">Menu</h3>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2">
                {Object.keys(sections).map(key => (
                  <button
                    key={key}
                    onClick={() => handleNavClick(key)}
                    className={`block w-full text-left px-4 py-3 rounded font-semibold transition-colors ${active === key ? 'bg-primary text-white' : 'text-primary hover:bg-primary/10'}`}
                  >
                    {sectionLabels[key]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Suspense fallback={<div>Loading...</div>}>
            {sections[active]}
          </Suspense>
        </main>
      </div>
    </div>
  );
} 