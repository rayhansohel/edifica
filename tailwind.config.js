/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'poppins': ["Poppins", "serif"],
      'antonio': ["Antonio", "serif"],
    },
    backgroundImage: {
      hero: "url('https://i.ibb.co.com/dKQGk3K/3.png')",
      login: "url('https://i.ibb.co.com/p2Cy5qM/login.jpg')",
      register: "url('https://i.ibb.co.com/Wcht9XT/2177.jpg')",
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#18181B",
          secondary: "#000000",
          accent: "#9002F1",
          neutral: "#52525B",
          "base-100": "#FFFFFF",
          "base-200": "#F3F4F6",
          "base-300": "#E5E7Eb",
          info: "#0ea5e9",
          success: "#10b981",
          warning: "#f97316",
          error: "#f43f5e",
        },
        dark: {
          primary: "#FAFAFA",
          secondary: "#FFFFFF",
          accent: "#9002F1",
          neutral: "#52525B",
          "base-100": "#010409",
          "base-200": "#0D1117",
          "base-300": "#151B23",
          info: "#0ea5e9",
          success: "#10b981",
          warning: "#f97316",
          error: "#f43f5e",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
