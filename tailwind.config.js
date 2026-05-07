/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },

      colors: {
        content: {
          primary: "#e8eaf0",
          secondary: "#8b90a0",
          tertiary: "#555b6e",
          light: "#e8eaf0",
        },
        brand: {
          primary: "#f0a500",
          secondary: "#e8c46a",
        },
        surface: {
          primary: "#13151a",
          secondary: "#1c1f27",
          tertiary: "#252933",
        },
        border: {
          primary: "#2a2e3a",
          secondary: "#353a4a",
        },
        auth: {
          primary: "#0b0c0f",
          app: "#07080a",
        },
      },

      keyframes: {
        bvMarquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        bvCatFadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bvBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        bvFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        bvPulseSoft: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(0.95)" },
        },
        bvShimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },

      animation: {
        bvMarquee: "bvMarquee 15s linear infinite",
        bvCatFadeUp: "bvCatFadeUp 0.5s ease both",
        bvBlink: "bvBlink 1.4s ease-in-out infinite",
        bvFloat: "bvFloat 3s ease-in-out infinite",
        bvPulseSoft: "bvPulseSoft 2s ease-in-out infinite",
        bvShimmer: "bvShimmer 2s infinite",
      },
    },
  },
  plugins: [],
};