/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
  ],
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'],
      'serif': ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif']

    },
    extend: {
      colors: {
        'umber': "#A5777B"
      }
    },
  },
  plugins: [],
}