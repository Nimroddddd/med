import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import ServicesSection from './components/sections/ServicesSection'
import ResourcesSection from './components/sections/ResourcesSection'
import ContactSection from './components/sections/ContactSection'
import NotFound from './components/sections/NotFound'
import { AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <AnimatePresence mode='wait'>
          <main className='min-h-screen'>
            <Routes>
              <Route path="/" element={<HeroSection />} />
              <Route path="/about" element={<AboutSection />} />
              <Route path="/services" element={<ServicesSection />} />
              <Route path="/resources" element={<ResourcesSection />} />
              <Route path="/contact" element={<ContactSection />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  )
}

export default App
