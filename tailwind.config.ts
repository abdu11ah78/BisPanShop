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
          gold: "#E5BD47",       // Warm Highlight (Gold/Yellow)
          goldShaded: "#C9A033", // Shaded Gold
          cream: "#F8F9FA",      // Light background
          softBg: "#F0F7F3",     // Soft green tint background
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(30, 62, 46, 0.12)",
        glow: "0 0 20px rgba(82, 184, 130, 0.4)",
        goldGlow: "0 0 20px rgba(229, 189, 71, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
