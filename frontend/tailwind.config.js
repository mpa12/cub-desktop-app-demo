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
      'light-gray': '#f0f2f6',
      light: '#f6f7fa',
      gray: '#808080'
    },
    extend: {},
  },
  plugins: [],
}

