/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        correct: {
          "0%": { backgroundColor: "#10b981" }, // green-600
          "50%": { backgroundColor: "#34d399" }, // green-400
          "100%": { backgroundColor: "#10b981" }, // green-600
        },
        wrong: {
          "0%": { backgroundColor: "#ef4444" }, // red-600
          "50%": { backgroundColor: "#f87171" }, // red-400
          "100%": { backgroundColor: "#ef4444" }, // red-600
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-10px)" },
          "50%": { transform: "translateX(10px)" },
          "75%": { transform: "translateX(-10px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        correct: "correct 0.5s ease-in-out",
        wrong: "wrong 0.5s ease-in-out",
        shake: 'shake 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
