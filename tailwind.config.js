/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {fontFamily: {
      sans: ['Roboto', 'sans-serif'], // Définit Roboto comme police par défaut pour "sans"
    },},
 
  },
  plugins: [],
}