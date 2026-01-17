/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serrat: 'Montserrat',
        manrope: 'Manrope',
      },
      colors: {
        primary: {
          100: '#1A53FD',
          200: '#1262B1',
        },
        neutral: { 100: '#C6E3FF', 200: '#5E5C5C' },
        secondary: {
          100: '#FD901A',
          200: '#B16512',
        },
      },
    },
  },
  plugins: [],
}
