/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn .5s ease-in-out",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        transitionDelay: {
          0: "0s",
          200: "0.2s",
          400: "0.4s",
          600: "0.6s",
          800: "0.8s",
          1000: "1s",
          // Add more delays as needed
        },
      },
    },
  },
  plugins: [],
};
