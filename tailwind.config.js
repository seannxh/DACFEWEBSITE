/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui', "Rubik", "cursive"],
        cursive: ['"Dancing Script"', 'cursive'],
        tomorrow: ['"Tomorrow"', 'sans-serif'],
        nova: ['"Nova Square"', 'sans-serif'],
        league: ['"League Gothic"', 'sans-serif'], // Example of adding a custom font
      },
      colors: {
        primary: '#ff5722', // Custom primary color
        secondary: '#009688', // Custom secondary color
        greybg: '#1a1919'
      },
      spacing: {
        '128': '32rem', // Custom spacing (e.g., 128 for 32rem)
      },
      screens: {
        'custom': '767px',
        'custom-md': '1007px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),],
}
