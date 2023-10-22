/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
        },
        secondary: "var(--secondary)",
        gray: {
          ...colors.gray,
          DEFAULT: "var(--gray)",
        },
        red: {
          ...colors.red,
          DEFAULT: "var(--red)",
        },
        green: {
          ...colors.green,
          DEFAULT: "var(--green)",
        },
        blue: {
          ...colors.blue,
          DEFAULT: "var(--blue)",
        },
        black: "var(--black)",
        info: "var(--info)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
