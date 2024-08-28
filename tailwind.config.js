/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        correct: {
          light: "#6aaa64",
          dark: "#538d4e",
          hc: "#f5793a",
          hc_dark: "#f5793a",
        },
        absent: {
          light: "#787c7e",
          dark: "#3a3a3c",
          hc: "#787c7e",
          hc_dark: "#3a3a3c",
        },
        present: {
          light: "#c9b458",
          dark: "#b59f3b",
          hc: "#85c0f9",
          hc_dark: "#85c0f9",
        },
        keyboard: {
          light: "#d3d6da",
          dark: "#818384",
          hc: "#d3d6da",
          hc_dark: "#818384",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("high-contrast", "&:is(.high-contrast *)");
      addVariant("high-contrast-dark", "&:is(.high-contrast-dark *)");
      addVariant("light", "&:is(.light *)");
    }),
  ],
};
