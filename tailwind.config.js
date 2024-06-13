/** @type {import('tailwindcss,flowbite').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        light: "#f8f8fa",
        lightElevate: "#f2f1f5",
        lightElevateHover: "#eceaf0 ",
        lightNav: "#e5e4ea",
        dark: "#15131D",
        darkElevate: "#312E3F",
        darkElevateHover: "#15141C",
        darkNav: "#1C1A26",
        Light10: "#f8f8fa",
        Light20: "#f2f1f5",
        Light30: "#eceaf0",
        Light40: "#e5e4ea",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
