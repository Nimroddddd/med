import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import ServicesSection from './components/sections/ServicesSection'
import ResourcesSection from './components/sections/ResourcesSection'
import ContactSection from './components/sections/ContactSection'
import NotFound from './components/sections/NotFound'
import BookingSection from './components/sections/BookingSection'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import OwnerPortalApp from './components/portal/OwnerPortalApp'
import ProvidersSection from './components/sections/ProvidersSection'
import ProviderDetail from './components/sections/ProviderDetail'
import TherapyMethods from './components/sections/resources/TherapyMethods'
import FAQs from './components/sections/resources/FAQs'
import Forms from './components/sections/resources/Forms'
import Insurance from './components/sections/resources/Insurance'
import Testimonials from './components/sections/resources/Testimonials'
import PayOnline from './components/sections/resources/PayOnline'
import News from './components/sections/resources/News'
import GuidesTips from './components/sections/resources/GuidesTips'
import Blog from './components/sections/resources/Blog'

function AppContent() {
  const location = useLocation();
  const isOwnerPortal = location.pathname.startsWith('/owner-portal');
  return (
      <div className="App">
      {!isOwnerPortal && <Header />}
        <AnimatePresence mode='wait'>
          <main className='min-h-screen'>
            <Routes>
              <Route path="/" element={<HeroSection />} />
              <Route path="/about" element={<AboutSection />} />
              <Route path="/services" element={<ServicesSection />} />
              <Route path="/resources" element={<ResourcesSection />} />
              <Route path="/contact" element={<ContactSection />} />
            <Route path="/book" element={<BookingSection />} />
            <Route path="/owner-portal" element={<OwnerPortalApp />} />
            <Route path="/providers" element={<ProvidersSection />} />
            <Route path="/providers/:id" element={<ProviderDetail />} />
            <Route path="/therapy-methods" element={<TherapyMethods />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/pay-online" element={<PayOnline />} />
            <Route path="/news" element={<News />} />
            <Route path="/guides-tips" element={<GuidesTips />} />
            <Route path="/blog" element={<Blog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </AnimatePresence>
      {!isOwnerPortal && <Footer />}
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
