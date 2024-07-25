/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        secondary: "#334155",
        warning: "#EFCA59",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
