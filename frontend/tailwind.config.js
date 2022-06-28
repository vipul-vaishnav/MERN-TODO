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
    },
  },
  plugins: [require('daisyui')],
};
