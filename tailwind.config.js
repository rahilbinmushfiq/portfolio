const { screens, fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': { 'raw': '(min-width: 350px) and (min-height: 800px)' },
      ...screens,
      '3xl': '2400px',
      'dpr-lg': { 'raw': '(orientation: landscape) and (-webkit-min-device-pixel-ratio: 1.2)' },
      'dpr-xl': { 'raw': '(orientation: landscape) and (-webkit-min-device-pixel-ratio: 1.45)' },
    },
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', ...fontFamily.sans],
      },
      colors: {
        primary: {
          lightest: '#e9deff',
          lighter: '#e2d2ff',
          light: '#864df8',
          base: '#7342d5',
          dark: '#5933a5',
        },
      },
    },
  },
  plugins: [],
}
