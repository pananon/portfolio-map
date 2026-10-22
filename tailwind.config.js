/** @type {import('tailwindcss').Config} */
// Styling lives in src/index.css as design tokens; Tailwind supplies the reset and a few utilities.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
};
