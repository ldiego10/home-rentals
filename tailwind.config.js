/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',   // Important for Next.js App Router
    './pages/**/*.{js,ts,jsx,tsx}', // Support for Pages Router (if applicable)
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};