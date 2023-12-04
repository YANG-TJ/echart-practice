/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,scss}'],
  theme: {
    extend: {
      colors: {
        '1st-color': '#02e6b0',
        '2nd-color': '#acf2e1',
        'dark-bg': '#242424',
        'dark-btn': '#4a4a4a'
      }
    }
  },
  darkMode: 'class'
}
