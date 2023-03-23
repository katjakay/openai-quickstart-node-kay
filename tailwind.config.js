/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      yellow: '#C5C32B',
      brown: '#A24300',
      blue: '#2F5FFF',
      white: '#FFFFFF',
      beige: '#BEB3B5',
      purple: '#BEB3B5',
      lightBrown: '#EFECE4',
    },
    extend: {},
    fontFamily: {
      sans: ['Supply', 'sans-serif'],
    },
  },
  plugins: [require('daisyui')],
};
