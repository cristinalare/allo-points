import type { Config } from "tailwindcss";
const { withTV } = require("tailwind-variants/transformer");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "allo-bg": "url('/allo-bg.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: {
          200: "#9EDCFF",
          600: "#191AFE",
          800: "#082553",
        },
        yellow: {
          200: "#F8FFA9",
          500: "#F0FF40",
        },
        grey: {
          100: "#EBEBEB",
          200: "#CACBCB",
          400: "#979998",
        },
      },
    },
  },
  plugins: [],
};
export default config;
