import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#52B882",      // Primary Accent
          medium: "#3A9D6A",     // Secondary Accent
          dark: "#2A5C43",       // Dark Accent (Base Green)
          deep: "#1E3E2E",       // Deep Neutral (Forest Green)
          deepest: "#12271D",    // Deepest Forest Background
          gold: "#E5BD47",       // Warm Highlight (Gold/Yellow)
          goldShaded: "#C9A033", // Shaded Gold
          softDark: "#183225",   // Soft dark card surface
          cardBg: "#162E22",     // Dark card surface
        },
      },
      fontFamily: {
        sans: ["var(--font-barlow)", "Barlow", "system-ui", "sans-serif"],
        serif: ["var(--font-barlow)", "Barlow", "Georgia", "serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        glow: "0 0 25px rgba(82, 184, 130, 0.3)",
        goldGlow: "0 0 25px rgba(229, 189, 71, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
