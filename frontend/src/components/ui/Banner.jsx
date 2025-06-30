import React from 'react';

export default function Banner({ image, title, subtitle, titleColor = 'text-white', subtitleColor = 'text-gray-100', icon }) {
  return (
    <div className="relative w-full h-56 md:h-72 lg:h-80 flex items-center justify-center mb-10">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
      />
      <div className="pt-10 relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/40">
        {icon && <div className="mt-4 mb-2">{icon}</div>}
        <h1 className={`text-3xl md:text-5xl font-bold drop-shadow mb-2 text-center ${titleColor}`}>{title}</h1>
        {subtitle && <p className={`text-lg md:text-xl text-center max-w-2xl ${subtitleColor}`}>{subtitle}</p>}
      </div>
    </div>
  );
} 