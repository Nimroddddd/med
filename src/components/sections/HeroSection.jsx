import { motion } from 'framer-motion';
import { Calendar, Phone, ArrowRight, Shield, Heart, Users, MapPin } from 'lucide-react';
import PageTransition from '../PageTransition';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HERO_BG = "fam.jpg"

const HERO_SLIDES = [
  {
    title: 'Anxiety',
    img: '/anxiety.jpg',
    desc: 'Learn more about how we treat anxiety disorders.',
    link: '/conditions/anxiety',
  },
  {
    title: 'Depression',
    img: '/depression.jpg',
    desc: 'Discover our approach to depression care.',
    link: '/conditions/depression',
  },
  {
    title: 'OCD',
    img: '/ocd.jpg',
    desc: 'Find out about our OCD treatment options.',
    link: '/conditions/ocd',
  },
  {
    title: 'ADHD',
    img: '/adhd.jpg',
    desc: 'Explore our treatment options for ADHD.',
    link: '/conditions/adhd',
  },
  {
    title: 'PTSD',
    img: '/ptsd.jpg',
    desc: 'Comprehensive care for post-traumatic stress disorder.',
    link: '/conditions/ptsd',
  },
  {
    title: 'Bipolar Disorder',
    img: '/bipolar.jpg', // Reusing image
    desc: 'Personalized treatment plans for bipolar disorder.',
    link: '/conditions/bipolar-disorder',
  },
];

const HeroSection = () => {
  return (
    <PageTransition>
      <section
        id="home"
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-primary/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 w-full max-w-2xl mx-auto"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight drop-shadow-lg"
              >
                Your Health,{' '}
                <span className="text-primary">Our Priority</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-black leading-relaxed drop-shadow font-medium"
              >
                Welcome to compassionate, comprehensive psychiatric and wellness care. We provide personalized mental health care for you and your loved ones in a supportive environment.
              </motion.p>
            </div>

            {/* Single CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center"
            >
              <Link
                to="/book"
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-secondary transition-colors shadow"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Address Bar */}
      <div className="w-full bg-primary text-white py-3 flex items-center justify-center text-center shadow">
        <Link
          to="/contact#map-location"
          className="group inline-flex items-center gap-3 text-base font-medium hover:text-secondary transition-colors px-4 py-2 rounded-full"
        >
          <MapPin className="h-5 w-5 flex-shrink-0" />
          <span>1147 Brook Forest Avenue, Shorewood, IL 60404</span>
          <span className="ml-2 text-xs uppercase font-bold bg-white/20 text-white px-3 py-1 rounded-full group-hover:bg-white/30 transition-colors flex items-center gap-1.5">
            View Map
            <ArrowRight className="w-3 h-3" />
          </span>
        </Link>
      </div>
      {/* Why Choose Us Section */}
      <section className="mt-14 w-full relative py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-10 drop-shadow-lg">Why Conventions Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-primary to-blue-900 rounded-2xl shadow-xl p-8 flex flex-col items-start md:items-center text-left md:text-center transition-transform hover:scale-105">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-accent mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 10h.01M15 10h.01" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21c-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9s9 4.03 9 9c0 4.97-4.03 9-9 9z" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 10h.01M15 10h.01" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Cutting Edge & Evidence Based</h3>
              <p className="text-base text-white/90">Medication & Psychotherapy, TMS therapy, non-invasive Rx, Spravato (Nasal Esketamine), Clinical Research – New Drugs</p>
            </div>
            {/* Card 2 */}
            <div className="bg-gradient-to-br from-primary to-blue-900 rounded-2xl shadow-xl p-8 flex flex-col items-start md:items-center text-left md:text-center transition-transform hover:scale-105">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2l4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Board Certified Experienced & Trained</h3>
              <p className="text-base text-white/90">Physicians, Physician Assistants, Nurse Practitioners, Psychologists & Counselors</p>
            </div>
            {/* Card 3 */}
            <div className="bg-gradient-to-br from-primary to-blue-900 rounded-2xl shadow-xl p-8 flex flex-col items-start md:items-center text-left md:text-center transition-transform hover:scale-105">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3v4M8 3v4M2 13h20" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="16" r="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Virtual Appointments – TelePsych</h3>
              <p className="text-base text-white/90">Secure virtual therapy for all Illinois residents—convenient, confidential, easy to schedule</p>
            </div>
            {/* Card 4 */}
            <div className="bg-gradient-to-br from-primary to-blue-900 rounded-2xl shadow-xl p-8 flex flex-col items-start md:items-center text-left md:text-center transition-transform hover:scale-105">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8a6 6 0 00-12 0c0 7 6 13 6 13s6-6 6-13z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="8" r="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Research</h3>
              <p className="text-base text-white/90">Clinical Trials for new drugs and procedures for psychiatric disorders</p>
            </div>
          </div>
        </div>
      </section>
      {/* Swiper Carousel with Heading */}
      <section className="relative w-full bg-white flex flex-col items-center justify-center pt-8 pb-4">
        <div className="w-full max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-5xl mb-2 text-primary font-extrabold">Conditions We Treat</h2>
          </div>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            loop
            speed={700}
            className="rounded-xl shadow-lg"
          >
            {HERO_SLIDES.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-[340px] md:h-[400px] flex items-center justify-center overflow-hidden rounded-xl">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-6">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">{slide.title}</h3>
                    <p className="mb-4 text-base md:text-lg font-medium drop-shadow-lg text-center max-w-md">{slide.desc}</p>
                    <a
                      href={slide.link}
                      className="px-6 py-2 rounded-full border-2 border-white text-white font-semibold hover:bg-primary hover:border-primary transition-colors text-base backdrop-blur-sm"
                    >
                      {slide.title === 'OCD' ? 'Learn More' : 'View More'}
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </PageTransition>
  );
};

export default HeroSection; 