/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F286C',
        primary_hover: '#0C2056',
        secondary: '#EFC007',
        secondary_hover: '#C39D05',
        text: '#020202',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'serif'],
      },
    },
  },
  plugins: [],
}

