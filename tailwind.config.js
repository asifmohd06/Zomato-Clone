/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        form: "url(/public/background.jpg)",
      },
    },
  },
  plugins: [],
};
