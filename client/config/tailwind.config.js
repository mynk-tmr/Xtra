import daisyui from "daisyui";
import mypresets from "./daisyui.config";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        fill: "repeat(auto-fill , minmax(36ch , 1fr))",
        fillxs: "repeat(auto-fill , minmax(20ch , 1fr))",
      },
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
  daisyui: mypresets,
};
