import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const resourcesDropdown = [
  { name: 'Therapy Approaches', href: '/therapy-methods' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'Patient Forms', href: '/forms' },
  { name: 'Insurance Info', href: '/insurance' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Pay Online', href: '/pay-online' },
  { name: 'News & Updates', href: '/news' },
  { name: 'Guides & Tips', href: '/guides-tips' },
  { name: 'Blog', href: '/blog' },
];

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Providers', href: '/providers' },
  { name: 'Services', href: '/services' },
  { name: 'Resources', href: '/resources', dropdown: true },
  { name: 'Contact', href: '/contact' },
];

const MotionLink = motion(Link);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showMobileResources, setShowMobileResources] = useState(false);
  const closeDropdownTimer = useRef();
  const location = useLocation();

  const handleResourcesEnter = () => {
    if (closeDropdownTimer.current) clearTimeout(closeDropdownTimer.current);
    setShowResources(true);
  };
  const handleResourcesLeave = () => {
    closeDropdownTimer.current = setTimeout(() => {
      setShowResources(false);
    }, 150);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">MD</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xl md:text-xl sm:text-lg text-base font-bold text-primary leading-tight whitespace-nowrap max-w-[160px] sm:max-w-none truncate md:whitespace-nowrap">Healthwise Psychiatry and Wellness</span>
              <span className="text-xs text-gray-500 font-medium tracking-wide mt-0.5">LLC</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.dropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={handleResourcesEnter}
                  onMouseLeave={handleResourcesLeave}
                >
                  <button className="flex items-center text-gray-700 hover:text-primary font-medium transition-colors focus:outline-none">
                    {item.name}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  {showResources && (
                    <div
                      className="absolute left-0 mt-2 w-64 bg-white border border-gray-100 rounded-lg shadow-lg z-50"
                      onMouseEnter={handleResourcesEnter}
                      onMouseLeave={handleResourcesLeave}
                    >
                      <ul>
                        {resourcesDropdown.map((res) => {
                          const isActive = location.pathname === res.href;
                          return (
                            <li key={res.name}>
                              <Link
                                to={res.href}
                                className={`block px-6 py-3 text-base transition-colors ${isActive ? 'bg-primary/20 text-primary font-semibold' : 'text-gray-800 hover:bg-primary/10 hover:text-primary'}`}
                              >
                                {res.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <motion.div key={item.name} whileHover={{ y: -2 }}>
                  <Link
                    to={item.href}
                    className="text-gray-700 hover:text-primary transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+1 (708) 953-5459</span>
            </div>
            <MotionLink
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-secondary transition-colors"
              to="/book"
            >
              Book Appointment
            </MotionLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 focus:outline-none"
            aria-label="Open menu"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                item.dropdown ? (
                  <div key={item.name}>
                    <button
                      className="flex items-center w-full px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors"
                      onClick={() => setShowMobileResources((v) => !v)}
                      aria-expanded={showMobileResources}
                      aria-controls="mobile-resources-dropdown"
                    >
                      {item.name}
                      <ChevronDown className="w-5 h-5 ml-2 flex-shrink-0" />
                    </button>
                    {showMobileResources && (
                      <div className="pl-4" id="mobile-resources-dropdown">
                        {resourcesDropdown.map((res) => {
                          const isActive = location.pathname === res.href;
                          return (
                            <Link
                              key={res.name}
                              to={res.href}
                              className={`block px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-700 hover:text-primary hover:bg-primary/10'}`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {res.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-sm text-gray-600 px-3 py-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (708) 953-5459</span>
                </div>
                <Link
                  to="/book"
                  className="w-full mt-2 bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-secondary transition-colors block text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header; 