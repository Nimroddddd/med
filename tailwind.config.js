/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6495ED", // cerulean blue
        secondary: "#2563eb", // blue-600 for contrast
        accent: "#93c5fd", // blue-300 for lighter accent
        neutral: "#FFFFFF", // white,
        eh: "#bfdbfe",
        "neutral-dark": "#334155", // slate-700
        "medical-blue": "#6495ED",
        "medical-light": "#e0edfa", // very light cerulean
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}

