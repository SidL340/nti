/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette — deep navy + electric blue accent
        brand: {
          50:  "hsl(215, 100%, 97%)",
          100: "hsl(215, 96%,  92%)",
          200: "hsl(215, 90%,  82%)",
          300: "hsl(215, 86%,  68%)",
          400: "hsl(215, 82%,  55%)",
          500: "hsl(215, 78%,  45%)",  // Primary
          600: "hsl(215, 76%,  36%)",
          700: "hsl(215, 72%,  28%)",
          800: "hsl(215, 68%,  18%)",
          900: "hsl(215, 64%,  12%)",  // Dark navy
        },
        accent: {
          400: "hsl(195, 100%, 50%)",  // Electric cyan
          500: "hsl(195, 100%, 42%)",
        },
        surface: {
          DEFAULT: "hsl(220, 20%, 97%)",
          dark:    "hsl(220, 22%, 12%)",
        },
      },
      fontFamily: {
        sans:    ["'Inter'",    "sans-serif"],
        display: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      animation: {
        "fade-in":      "fadeIn 0.5s ease-in-out",
        "slide-up":     "slideUp 0.6s ease-out",
        "float":        "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:  { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideUp: { "0%": { opacity: 0, transform: "translateY(24px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        float:   { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      boxShadow: {
        "card":   "0 4px 24px -4px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 12px 40px -8px rgba(0,0,0,0.16), 0 2px 4px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
