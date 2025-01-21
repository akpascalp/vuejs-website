/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'futura': ['futura', 'sans-serif'],
        'montserrat': ['montserrat', 'sans-serif'],
        'brandon-grotesque': ['brandon-grotesque', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
