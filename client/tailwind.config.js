/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple1: "rgb(255, 117, 230)", // Example color
        purple2: "rgb(145, 71, 255)",
        purple3: "rgb(92, 22, 197)",
        purple4: "rgb(51, 12, 110)",
        red: "rgb(235, 4, 0)",
        light: "rgb(173, 173, 184)",
        black1: "rgb(83, 83, 95, 0.38)", // Example color
        black2: "rgb(31, 31, 35)", // Example color,
        black3: "rgb(24, 24, 27)",
        black4: "rgb(0, 0, 0)",
        black0: "rgba(153, 153, 164, 0.38)",
      },
    },
  },
  plugins: [],
};
