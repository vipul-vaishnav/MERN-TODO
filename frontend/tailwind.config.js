/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      width: {
        76: '300px',
      },
      maxHeight: {
        '90vh': '90vh',
      },
      minWidth: {
        '4xl': '300px',
        '5xl': '320px',
      },
    },
  },
  plugins: [require('daisyui')],
};
