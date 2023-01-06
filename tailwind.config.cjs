/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        background: '#1b1c1e',
        text: '#f5f5f5',
        'accent-1': '#1691cc',
        'accent-2': '#ff9f1c',
      }
    },
  },
  plugins: [],
}
