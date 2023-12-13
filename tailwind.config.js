/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      purple: {
        DEFAULT: '#642a73',
        hover: '#833b95',
      },
      white: '#fff',
      'dark-gray': '#333',
      red: '#bb1a1a',
      green: {
        DEFAULT: '#1c9a47',
        hover: '#2cbb5d',
      },
      'light-green': {
        DEFAULT: '#91e3ad',
        hover: '#b5dcc2',
      },
      'light-gray': {
        DEFAULT: '#f0f2f6',
        hover: '#eaebee'
      },
      light: '#f6f7fa',
      gray: {
        DEFAULT: '#808080',
        hover: '#e7e7e7'
      },
      blue: {
        DEFAULT: '#1363f8',
        hover: '#3f88f5',
      }
    },
    extend: {},
  },
  plugins: [],
}

