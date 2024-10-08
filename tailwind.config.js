/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F286C',
        secondary: '#EFC007',
        background: '#FAFAFA',
        text: '#020202',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'serif'],
      },
    },
  },
  plugins: [],
}

