/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/primereact/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        main: "#3632C7",
        accent: "#39E3D7",
        grayq: "#D7D6F4",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "600px",
          md: "728px",
          lg: "984px",
          xl: "1200px",
          "2xl": "1200px",
        },
      },
    },
  },
  plugins: [],
};
