/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/src/assets/smoky.png')", // Adjust the path to your image
      },
    },
  },
  plugins: [],
};
