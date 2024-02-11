import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

const myColors = {
  primary: "#4ade80",
  secondary: "#38bdf8",
  accent: "#fb7185",
  neutral: "#d1d5db",
  "base-100": "#e0f2fe",
  info: "#6d28d9",
  success: "#d9f99d",
  warning: "#fcd34d",
  error: "#b91c1c",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        fill: "repeat(auto-fill , minmax(36ch , 1fr))",
        fillxs: "repeat(auto-fill , minmax(20ch , 1fr))",
      },
      colors: myColors,
      screens: {
        xs: { min: "540px" },
      },
      boxShadow: {
        stripe: "lightgray 0px 2px 3px, lightgray 0px -2px 3px",
      },
      fontFamily: {
        sans: "Lato, sans-serif",
      },
    },
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          ...myColors,
        },
      },
    ],
  },
};
