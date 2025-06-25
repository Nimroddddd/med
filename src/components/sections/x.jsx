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