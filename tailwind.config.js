/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6A00',
          dark: '#090909',
          card: '#111111',
          cardHover: '#161616',
          border: '#1f1f1f',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'orange-glow': 'radial-gradient(circle at center, rgba(255,106,0,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
