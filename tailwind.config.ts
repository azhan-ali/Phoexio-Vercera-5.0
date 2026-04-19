import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        paper: {
          DEFAULT: "#f7f1e3",
          dark: "#efe6cf",
          cream: "#fbf6e9",
        },
        ink: {
          DEFAULT: "#1a1a1a",
          soft: "#2d2d2d",
          faded: "#555",
        },
        sketch: {
          red: "#e63946",
          orange: "#f77f00",
          yellow: "#fcbf49",
          green: "#52b788",
          blue: "#4361ee",
          purple: "#9d4edd",
          pink: "#ff6b9d",
        },
        phoenix: {
          flame: "#ff4500",
          ember: "#ff8c42",
          gold: "#ffba08",
          ash: "#3d3d3d",
        },
      },
      fontFamily: {
        hand: ["var(--font-kalam)", "cursive"],
        scribble: ["var(--font-caveat)", "cursive"],
        note: ["var(--font-patrick)", "cursive"],
      },
      animation: {
        wobble: "wobble 0.6s ease-in-out infinite",
        "wobble-slow": "wobble 3s ease-in-out infinite",
        "draw-in": "drawIn 1.2s ease-out forwards",
        "sketch-float": "sketchFloat 4s ease-in-out infinite",
      },
      keyframes: {
        wobble: {
          "0%, 100%": { transform: "rotate(-0.5deg)" },
          "50%": { transform: "rotate(0.5deg)" },
        },
        drawIn: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        sketchFloat: {
          "0%, 100%": { transform: "translateY(0) rotate(-1deg)" },
          "50%": { transform: "translateY(-8px) rotate(1deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
