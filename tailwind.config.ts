import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}", // для App Router
    "./pages/**/*.{ts,tsx}", // если используешь Pages Router
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif", "Manrope"], // подключённый тобой шрифт
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

export default config;
