/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
                sans: ['"Hanken Grotesk"', 'sans-serif'], 
                serif: ['Times New Roman', 'serif'],
              },
      colors: {
              'wiki-bg': '#191924',      // Your custom purple-grey
              'wiki-panel': '#202122',   
              'wiki-border': '#a2a9b1', 
              'wiki-link': '#8eafff',   
            }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};