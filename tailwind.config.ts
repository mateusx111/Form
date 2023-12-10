import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-purple": {
          200: "#7A5CFA",
        },
        "custom-white": {
          100: "#666",
          200: "#CCC",
        },
        "custom-red": {
          100: "#EB5757",
        },
      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
