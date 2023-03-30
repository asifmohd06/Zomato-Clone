/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        formBg1: "url(/public/background.jpg)",
        formBg2: "url(/public/formBg.jpg)",
        formBg3: "url(/public/formBg3.jpg)",
        formBg4: "url(/public/formBg4.jpg)",
        formBg5: "url(/public/formBg5.jpg)",
        menu1: "url(/public/menuBackground.jpg)",
        menu2: "url(/public/bgMenu2.jpg)",
        menu3: "url(/public/bgMenu3.jpg)",
      },
    },
    screens: {
      xsmall: "380px",
      mobile: "500px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
