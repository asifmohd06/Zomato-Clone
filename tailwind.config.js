/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        form: "url(/public/background.jpg)",
        menu1: "url(/public/menuBackground.jpg)",
        menu2: "url(/public/bgMenu2.jpg)",
        menu3: "url(/public/bgMenu3.jpg)",
      },
    },
  },
  plugins: [],
};
