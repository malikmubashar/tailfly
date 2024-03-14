import type { Config } from "tailwindcss";
import Tailfly from "tailfly";
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
        dynamic: "system",
        modes: ['light', '!dark', "zela"],
        py: ["#fff", "#000"],
        box: ["green", "red"],
        brand: ["skyblue", "pink"],
        clr: ["#000", "#fff"],
        circle: ['3rem', '4rem', '5rem'],
        inf: {
          circle: "borderRadius"
        }
      },
      darkMode: "class"
    })
  ]
};
export default config;