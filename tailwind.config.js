/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx,html}" // scan all files for Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
