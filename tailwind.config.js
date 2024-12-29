/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#fffff0",
      },
      boxShadow: {
        ball__outer:
          "10px 10px 30px rgb(13, 15, 12), -10px -10px 30px rgb(74, 74, 74)",
        ball__inner: "10px 10px 15px rgb(13, 15, 12)",
      },
      fontSize: {
        fontResponse: "clamp(0.75rem, 0.7313rem + 0.2985vw, 1rem);",
        font8: "clamp(0.85rem, 0.4657rem + 6.1493vw, 6rem);",
      },
      width: {
        ball__outer: "clamp(9.375rem, 8.6754rem + 11.194vw, 18.75rem)",
        ball__inner: "clamp(4.6875rem, 4.3377rem + 5.597vw, 9.375rem)",
        ball__spotlight: "clamp(7.8125rem, 7.2295rem + 9.3284vw, 15.625rem)",
        ball__bg__shadow: "clamp(5.46875rem, 5.0606rem + 6.5299vw, 10.9375rem)",
        ball__upper__shadow: "clamp(0.85rem, 1.6769rem + 0.5731vw, 6.25rem)",
        ball__lower__shadow: "clamp(4.6875rem, 4.3377rem + 5.597vw, 9.375rem)",
      },
    },
  },
  plugins: [import("tailwind-scrollbar")],
};
