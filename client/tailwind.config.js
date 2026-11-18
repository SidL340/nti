/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Charcoal & Modern Slate Palette
        charcoal: {
          950: "#080c14", // Deepest graphite background
          900: "#0f172a", // Dark charcoal base
          850: "#141e33", // Elevated card surface
          800: "#1e293b", // Slate panel border/fill
          700: "#334155", // Subtle borders
          600: "#475569", // Muted text
          400: "#94a3b8", // Body secondary
          300: "#cbd5e1", // Body primary soft silver
          200: "#e2e8f0", // Light silver headings
          100: "#f1f5f9", // Crisp white-silver
        },
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6", // Vibrant royal blue
          600: "#2563eb", // Primary action blue
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      fontFamily: {
        sans:    ["'Inter'", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "'Inter'", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.3)",
        "card-hover": "0 12px 28px -4px rgba(0, 0, 0, 0.5), 0 4px 12px -2px rgba(37, 99, 235, 0.12)",
      },
    },
  },
  plugins: [],
};
