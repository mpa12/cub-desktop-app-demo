/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      blue: {
        DEFAULT: '#1363f8',
        hover: '#3f88f5',
      },
      'dark-gray': '#333',
      gray: {
        DEFAULT: '#808080',
        hover: '#e7e7e7',
        100: '#d6d6d6'
      },
      green: {
        DEFAULT: '#1c9a47',
        hover: '#2cbb5d',
      },
      light: '#f6f7fa',
      'light-gray': {
        DEFAULT: '#f0f2f6',
        hover: '#eaebee'
      },
      'light-green': {
        DEFAULT: '#91e3ad',
        hover: '#b5dcc2',
      },
      purple: {
        DEFAULT: '#642a73',
        hover: '#833b95',
      },
      red: '#bb1a1a',
      white: '#fff'
    },
    extend: {},
  },
  plugins: [],
}

