/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#fffff0',
      },
      boxShadow: {
        ball__outer: '10px 10px 30px rgb(13, 15, 12), -10px -10px 30px rgb(74, 74, 74)',
        ball__inner: '10px 10px 15px rgb(13, 15, 12)',
      },
      fontSize: {
        fontResponse: 'clamp(0.75rem, 0.7313rem + 0.2985vw, 1rem);',
        font8: 'clamp(0.85rem, 0.4657rem + 6.1493vw, 6rem);',
      }
    },
  },
  plugins: [],
}

