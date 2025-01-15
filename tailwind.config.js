/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'poppins': ["Poppins", "serif"],
      'antonio': ["Antonio", "serif"],
    },
  },
  plugins: [require("daisyui")],
};
