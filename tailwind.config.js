/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      /* FONT CONFIG */
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      /* WAVEFORM ANIMATION */
      keyframes: {
        wave: {
          "0%": { height: "10px" },
          "50%": { height: "34px" },
          "100%": { height: "10px" },
        },
      },

      animation: {
        wave: "wave 0.9s ease-in-out infinite",
      },
    },
  },

  plugins: [],
};
