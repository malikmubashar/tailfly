import type { Config } from "tailwindcss";
import Tailfly from "../dist";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "noom-90": "red"
      }
    },
  },
  plugins: [
    Tailfly({
      def: {
        dynamic: "system",//true or mode
        modes: ['light', '!dark', "zela"],
        py: ["#fff", "#000"],
        box: ["green", "red"],
        primary: ["#fff", "#0070f3"],
        brand: ["skyblue", "pink"],
        clr: ["#000", "#fff"],
        circle: ['4rem', '6rem'],
        borderW: ['4px', '2px'],
        inf: {
          circle: "borderRadius",
          borderW: "borderWidth"
        }
      },
      darkMode: ["selector", "[class*='$']"],
    })
  ]
};
export default config;