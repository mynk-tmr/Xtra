import daisyui from "daisyui";
import mypresets from "./daisyui.config";

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
    },
    boxShadow: {
      stripe:
        "lightgray 0px 0px 0px 2px, lightgray 0px 2px 6px -1px, lightgray 0px 1px 0px inset",
    },
  },
  plugins: [daisyui],
  daisyui: mypresets,
};
