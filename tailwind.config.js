/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue,svelte}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2fbf7",
          100: "#d3f5e6",
          200: "#a7ebce",
          300: "#74dcb3",
          400: "#39c894",
          500: "#15ad7b",
          600: "#0d895f",
          700: "#0c6c4d",
          800: "#0d563f",
          900: "#0c4735",
        }
      }
    },
  },
  plugins: [],
};
