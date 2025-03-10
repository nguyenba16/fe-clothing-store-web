/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        text: ["Poppins", 'sans-serif']
      },
      colors: {
        primary: '#A3804A',
        // secondary: '#FFF671',
        descText: '#4D4D4D',
        black: '#000000',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
}
